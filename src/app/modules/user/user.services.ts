import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.module';
import { TUser } from './user.interface';
import { User } from './user.model';
import { genereatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object

  const userData: Partial<TUser> = {};
  //if password not given , use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'Student';

 

//find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
  //generated id 
  userData.id = await genereatedStudentId(admissionSemester!);

  //creat a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    //set id , _id as user - embadding id
    payload.id = newUser.id;
    //reference id
    payload.user = newUser._id;

    const newStudent = Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
