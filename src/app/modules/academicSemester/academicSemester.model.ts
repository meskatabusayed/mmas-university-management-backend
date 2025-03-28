import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';
import { months } from './academicSemester.constant';
import AppError from '../../errors/AppError';
import status from 'http-status';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: ['Autumn', 'Summer', 'Fall'], required: true },
    year: { type: Number, required: true },
    code: { type: String, enum: ['01', '02', '03'], required: true },
    startMonth: { type: String, enum: months, required: true },
    endMonth: { type: String, enum: months, required: true },
  },
  { timestamps: true }
);

AcademicSemesterSchema.pre('save' , async function(next){
    const isSemesterExits = await AcademicSemester.findOne({
        year : this.year,
        name : this.name,
    })
    if(isSemesterExits){
        throw new AppError(status.CONFLICT , "Semester Already Exists");
    }

    next();
})

// Mongoose Model
export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema
);
