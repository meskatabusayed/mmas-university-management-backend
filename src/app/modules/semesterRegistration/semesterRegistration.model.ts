import { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: "AcademicSemester",
        unique : true,
        required: true,
    },
    status: {
        type: String,
        enum: ["UPCOMING", "ONGOING", "ENDED"],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCreadit: {
        type: Number,
        required: true,
    },
    maxCreadit: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export const SemesterRegistration = model<TSemesterRegistration>("SemesterRegistration", semesterRegistrationSchema);
