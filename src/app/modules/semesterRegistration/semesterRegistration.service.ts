import { SemesterRegistration } from './semesterRegistration.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

// Create a new semester registration
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
): Promise<TSemesterRegistration> => {
  try {
    console.log("Payload Received:", payload); // Debugging Line

    const academicSemester = payload?.academicSemester;
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
      $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
    });

    if (isThereAnyUpcomingOrOngoingSemester) {
      throw new AppError(
        status.BAD_REQUEST,
        `There is Already an ${isThereAnyUpcomingOrOngoingSemester.status} Registered Semester!`
      );
    }

    const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExist) {
      throw new AppError(status.NOT_FOUND, "This Academic Semester Not Found!");
    }

    const isSemesterRegistrationAlreadyExist = await AcademicSemester.findOne({ academicSemester });
    if (isSemesterRegistrationAlreadyExist) {
      throw new AppError(status.CONFLICT, "This semester is Already Registered!");
    }

    const semesterRegistration = new SemesterRegistration(payload);
    return await semesterRegistration.save();
  } catch (error: any) {
    console.error("Error in Service:", error.message); // Debugging Line
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Error creating semester registration: " + error.message
    );
  }
};


// Get all semester registrations
const getAllSemesterRegistrationsFromDB = async (query : Record<string , unknown>): Promise<
  TSemesterRegistration[]
> => {
  try {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate("academicSemester") , query).filter().sort().paginate().fields();
    const result = semesterRegistrationQuery.modelQuery;
    return result;
  } catch (error: any) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Error fetching all semester registrations: ' + error.message
    );
  }
};

// Get a single semester registration by ID
const getSingleSemesterRegistrationFromDB = async (
  id: string
): Promise<TSemesterRegistration | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    return await SemesterRegistration.findById(id)
      .populate('academicSemester')
      .exec();
  } catch (error: any) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Error fetching semester registration: ' + error.message
    );
  }
};

// Update a semester registration by ID
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */

  // check if the requested registered semester is exists
  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, 'This semester is not found !');
  }

  //if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      status.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
