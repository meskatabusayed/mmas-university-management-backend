import { TAcademicSemesterNameCodeMapper, TMonths } from './academicSemester.interface';

export const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;


export const academicSemesterNameCodeMapper : TAcademicSemesterNameCodeMapper = {
  Autumn : '01',
  Summer : '02',
  Fall : '03',

}
