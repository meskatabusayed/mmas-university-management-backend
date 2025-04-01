import { Schema, model, Types } from 'mongoose';
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from './course.interface';

// Pre-requisite Course Schema
const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Main Course Schema
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique : true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCourseSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

// Creating the model
export const Course = model<TCourse>('Course', courseSchema);




const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        unique : true,
        required: true,
    },
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: "Faculty",
            required: true,
        },
    ],
});

export const CourseFaculty = model<TCourseFaculty>("CourseFaculty", courseFacultySchema);

