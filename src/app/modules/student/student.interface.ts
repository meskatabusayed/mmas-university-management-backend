import { Model } from 'mongoose';

export type TAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};
export type TStudent = {
  id: number;
  password : string;
  name: string;
  age: number;
  email: string;
  phone?: string; // Optional field
  address: TAddress;
  dateOfBirth?: string; // Format: YYYY-MM-DD
  gender: 'Male' | 'Female' | 'Other';
  courses: string[];
  gpa: number;
  isActive: 'Active' | 'Block';
  enrollmentDate: string; // Format: YYYY-MM-DD
  isDeleted : boolean;
};

//for static method
export  interface StudentModel extends Model<TStudent> {
  isUserExist(id : number) : Promise<TStudent | null>
 
}

//for instance method

/* export type StudentMethods = {
  isUserExist(id: number): Promise<TStudent | null>;
};

export type StudentModel = Model<TStudent, Record<string ,  never>, StudentMethods>; */
