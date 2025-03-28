import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { 
        type: String, required: true, unique: true 
    },
    academicFaculty : {
        type : Schema.Types.ObjectId,
        ref : "AcademicFaculty"
    }
  },
  
  {
    timestamps: true,
  }
);





academicDepartmentSchema.pre("save" , async function(next) {
    const isAcademicDepartmentExist = await AcademicDepartmentModel.findOne({name : this.name})
    if(isAcademicDepartmentExist){
        throw new AppError(status.CONFLICT , "This Department is Already Exist!")
    }
    next();
});

academicDepartmentSchema.pre("findOneAndUpdate" , async function(next){
    const query = this.getQuery();
    const isAcademicDepartmentExist = await AcademicDepartmentModel.findOne(query);
    if(!isAcademicDepartmentExist){
        throw new AppError(status.NOT_FOUND , "This department does not exist!");
    }
    next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema
);
