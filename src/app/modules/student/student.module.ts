import { Schema, model } from 'mongoose';

import validator from 'validator';
import bcrypt from 'bcrypt';
import { StudentModel, TAddress, TStudent } from './student.interface';
import config from '../../config';


const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  state: { type: String, required: [true, 'State is required'] },
  zipCode: { type: String, required: [true, 'Zip Code is required'] },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: Number,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    
  },
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [20, 'Name can not exit 20 characters'],
    validate: {
      validator: function (value) {
        const name = value.charAt(0).toUpperCase() + value.slice(1);
        return name === value;
      },
      message: '{VALUE} is no correct',
    },
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not correct email',
    },
  },
  phone: { type: String, default: null },
  address: {
    type: addressSchema,
    required: [true, 'Please provide an address'],
  },
  dateOfBirth: { type: String, required: [true, 'Date of Birth is required'] },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  courses: {
    type: [String],
    required: [true, 'At least one course is required'],
  },
  gpa: { type: Number, required: [true, 'GPA is required'] },
  isActive: {
    type: String,
    enum: {
      values: ['Active', 'Block'],
      message: '{VALUE} is not a valid status',
    },
    default: 'Active',
    required: [true, 'Account status is required'],
  },
  enrollmentDate: {
    type: String,
    required: [true, 'Enrollment date is required'],
  },
  isDeleted : {
    type : Boolean ,
    default : false,
  }
} , {
    toJSON : {
        virtuals : true
    }
});

//virtuals
studentSchema.virtual("fullAddress").get(function(){
    return (
        `${this.address.street} ${this.address.city} and Meskat`
    )
})

//middleware : pre save middleware / hook : will create on creat() or save() method
studentSchema.pre("save" , async function(next){
    // console.log(this , "Pre hook : we will save data");
    const user = this;
   user.password = await bcrypt.hash(user.password , Number(config.bcrypt_solt_rounds) );
   next();

})

//middleware : post sove middleware/hook
studentSchema.post("save" , function(doc , next){
    // console.log(this , "post save data");
    doc.password = " ";
    next();
})

//Query middleware
studentSchema.pre("find" , async function(next){
    this.find({isDeleted : {$ne : true}});
    next();
})

studentSchema.pre("findOne" , async function(next){
    this.find({isDeleted : {$ne : true}});
    next();
})
//AGGREGATE query
studentSchema.pre("aggregate" , async function(next){
    this.pipeline().unshift({$match : {isDeleted : {$ne : true}}});
    next();
});

//creating custom static method
studentSchema.statics.isUserExist = async function(id : number){
    const existingUser = await Student.findOne({id});
    return existingUser;
}

//creating custom instance method

  /* studentSchema.methods.isUserExist = async function(id : number) {
    const existingUser = await Student.findOne({id});
    return existingUser;
 
 } */ 




// Model
export const Student = model<TStudent , StudentModel>('Student', studentSchema);
