import { Schema, model } from 'mongoose';
import { StudentModel,  TStudent } from './student.interface';


const guardianSchema = new Schema({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  relation: { type: String, required: true },
});

const localGuardianSchema = new Schema({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  relation: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImage: { type: String },
    admissionSemester: { type: String, required: true },
    academicDepartment: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);




//Query middleware
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
//AGGREGATE query
studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating custom static method
studentSchema.statics.isUserExist = async function (id: number) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating custom instance method

/* studentSchema.methods.isUserExist = async function(id : number) {
    const existingUser = await Student.findOne({id});
    return existingUser;
 
 } */

// Model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
