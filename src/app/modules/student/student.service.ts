import { Student } from '../student.module';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
    //using custom static method
    if(await Student.isUserExist(studentData.id)){
        throw new Error("Student already exist");
    }
    const result = await Student.create(studentData); //built in static method
    
    

  /* const student = new Student(studentData);
  console.log("86" , studentData.id);
  if(await student.isUserExist(studentData.id)){
    throw new Error("Already Exists");
  }
  const result = student.save(); //built in instance method from mongoose */

  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
//   const result = await Student.findOne({ id });
const result = await Student.aggregate([
    {$match : {id : Number(id)}}
])
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id } , {isDeleted : true});
  return result;
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
