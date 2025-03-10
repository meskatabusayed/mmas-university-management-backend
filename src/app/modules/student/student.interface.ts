import { Model, Types } from 'mongoose';

export type TGuardian = {
  name: string;
  contactNo: string;
  relation: string;
};

export type TLocalGuardian = {
  name: string;
  contactNo: string;
  relation: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;

  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: string;
  isDeleted: boolean;
};

//for static method
export interface StudentModel extends Model<TStudent> {
  isUserExist(id: number): Promise<TStudent | null>;
}

//for instance method

/* export type StudentMethods = {
  isUserExist(id: number): Promise<TStudent | null>;
};

export type StudentModel = Model<TStudent, Record<string ,  never>, StudentMethods>; */
