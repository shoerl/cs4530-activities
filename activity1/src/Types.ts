// Types.ts
// Types for the transcript database.

export type StudentID = number;
export type Student = { studentID: number, studentName: StudentName };
export type Course = string;
export type CourseGrade = { course: Course, grade: number };
export type Transcript = { student: Student, grades: CourseGrade[] };
export type StudentName = string

export function areCourseGradesEqual(grade1: CourseGrade, grade2: CourseGrade): boolean {
  return grade1.course == grade2.course && grade1.grade == grade2.grade;
}
