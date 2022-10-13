import { StudentID, Student, Course, CourseGrade, Transcript, areCourseGradesEqual } from './Types'
import { DataBase } from './dataBase';

let db: DataBase;

// start each test with a fresh empty database.
beforeEach(() => {
  db = new DataBase
});


describe('tests for addGrade', () => {

  test('addGrade should add a grade to the database given a course, student, and courseGrade', () => {
    const id1 = db.addStudent('Sean'); // adds student to database
    const student = db.getTranscript(id1).student; // gets the transcript of student from database
    const biologyCourse = "Biology"
    const biologyGrade = {course: biologyCourse, grade: 50} // courseGrade
    db.addGrade(student, biologyCourse, biologyGrade)
    const transcript = db.getTranscript(id1).grades;
    expect(transcript.some((element, index) => {
      return element === biologyGrade
    }))
  })

  test('addGrade should permit adding multiple, unique courseGrades for a student', () => {
    const id2 = db.addStudent('Kelly'); 
    const student2 = db.getTranscript(id2).student; 
    const mathCourse = "Math";
    const mathGrade = {course: mathCourse, grade: 70};
    const historyCourse = "History";
    const historyGrade = {course: historyCourse, grade: 60};
    const artCourse = "Art";
    const artGrade = {course: artCourse, grade: 50};

    db.addGrade(student2, mathCourse, mathGrade);
    db.addGrade(student2, historyCourse, historyGrade);
    db.addGrade(student2, artCourse, artGrade);

    const transcript2 = db.getTranscript(id2); 

    const grade2 = transcript2.grades;
    const updatedStudent2 = transcript2.student;

    expect(grade2.length).toEqual(3);

    expect(grade2).toContainEqual(mathGrade);
    expect(grade2).toContainEqual(historyGrade);
    expect(grade2).toContainEqual(artGrade);

    expect(updatedStudent2).toEqual(student2);
  })

  test('addGrade should throw an exception if a course, student, or courseGrade is null', () => {
    const id3 = db.addStudent('Alice');
    const idNull = db.addStudent(null);
    const student3 = db.getTranscript(id3).student;
    const studentNull = db.getTranscript(idNull).student; 
    const scienceCourse = "Science";
    const scienceGrade = {course: scienceCourse, grade: null}; 
    const gymCourse = null; 
    const gymGrade = {course: gymCourse, grade: 30};
    const latinCourse = "Latin";
    const latinGrade = {course: latinCourse, grade: 50};

    expect(() =>  {db.addGrade(student3, scienceCourse, scienceGrade);}).toThrow('courseGrade is null'); 
    expect(() => {db.addGrade(student3, gymCourse, gymGrade);}).toThrow('course is null');
    expect(() => {db.addGrade(studentNull, latinCourse, latinGrade);}).toThrow('student is null');
  })

})




// this may look undefined in TSC until you do an npm install
// and possibly restart VSC.
describe('tests for addStudent', () => {

  test('addStudent should add a student to the database', () => {
    // const db = new DataBase ()
    expect(db.nameToIDs('blair')).toEqual([])
    const id1 = db.addStudent('blair');
    expect(db.nameToIDs('blair')).toEqual([id1])
  });

  test('addStudent should return an unique ID for the new student',
    () => {
      // we'll just add 3 students and check to see that their IDs
      // are all different.
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('corey');
      const id3 = db.addStudent('delta');
      expect(id1).not.toEqual(id2)
      expect(id1).not.toEqual(id3)
      expect(id2).not.toEqual(id3)
    });

  test('the db can have more than one student with the same name',
    () => {
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('blair');
      expect(id1).not.toEqual(id2)
    })

  test('A newly-added student should have an empty transcript',
    () => {
      const id1 = db.addStudent('blair');
      const retrievedTranscript = db.getTranscript(id1)
      expect(retrievedTranscript.grades).toEqual([])
      expect(retrievedTranscript.student)
        .toEqual({
          studentID: id1, studentName: "blair"
        })
    });

  test('getTranscript should return the right transcript',
    () => {
      // add a student, getting an ID
      // add some grades for that student
      // retrieve the transcript for that ID
      // check to see that the retrieved grades are 
      // exactly the ones you added.    
    });

  test('getTranscript should throw an error when given a bad ID',
    () => {
      // in an empty database, all IDs are bad :)
      // Note: the expression you expect to throw must be wrapped in a (() => ...)
      expect(() => db.getTranscript(1)).toThrowError()
    });

    // test('getTranscript should throw an error when given a bad ID (bogus version)',
    // () => {
    //   // in an empty database, all IDs are bad :)
    //   // Note: the expression you expect to throw must be wrapped in a (() => ...)
    //   expect(db.getTranscript(1)).toThrowError()
    // });

})

describe('tests for addGrade', () => {
  const id1 = db.addStudent('Sean');
  const student1 = db.getTranscript(id1).student;
  const id2 = db.addStudent('Kelly');
  const student2 = db.getTranscript(id2).student;

  test('addGrade should add a grade to the database given a course, student, and courseGrade', () => {
    const biologyCourse = "Biology"
    const biologyGrade = {course: biologyCourse, grade: 50}
    db.addGrade(student1, biologyCourse, biologyGrade)
    const transcript1 = db.getTranscript(id1).grades;
    // is there some grade in our transcript array which is the same as the grade we added?
    expect(transcript1.some((grade, index) => areCourseGradesEqual(grade, biologyGrade)))

    const mathCourse = "Calculus 2"
    const mathGrade = {course: mathCourse, grade: 90}
    db.addGrade(student2, mathCourse, mathGrade)
    const transcript2 = db.getTranscript(id2).grades;
    expect(transcript2.some((grade, index) => areCourseGradesEqual(grade, mathGrade)))
  })

  test('addGrade should permit overriding a grade', () => {
    const physicsCourse = "Physics"
    const physicsGrade = {course: physicsCourse, grade: 70}
    db.addGrade(student1, physicsCourse, physicsGrade)
    let transcript = db.getTranscript(id1).grades;
    expect(transcript.some((grade, index) => areCourseGradesEqual(grade, physicsGrade)))

    physicsGrade.grade = 95;
    db.addGrade(student1, physicsCourse, physicsGrade)
    transcript = db.getTranscript(id1).grades;
    expect(transcript.some((grade, index) => areCourseGradesEqual(grade, physicsGrade)))
  })

  test('addGrade should throw an exception if any of the arguments are null', () => {
    expect(db.addGrade(student2, "Statistics", null)).toThrow("UNKNOWN ERROR")

    expect(db.addGrade(student1, null, {course: "History", grade: 35})).toThrow("UNKNOWN ERROR")

    expect(db.addGrade(null, "English", {course: "English", grade: 83})).toThrow("UNKNOWN ERROR")

  })


  test('addGrade should throw an exception if the provided student id is null', () => {
    const id3 = db.addStudent('Anjali');
    const student3 = db.getTranscript(id3).student;
    student3.studentID = null;
    expect(db.addGrade(student3, "Statistics", {course: "Statistics", grade: 74})).toThrow("UNKNOWN ERROR");
    
  })

  test('addGrade should throw an exception if the provided course name is an empty string', () => {
    expect(db.addGrade(student2, "", {course: "Math", grade: 30})).toThrow("UNKNOWN ERROR")

    expect(db.addGrade(student2, "Math", {course: "Math", grade: 40})).toThrow("UNKNOWN ERROR")

  })

  test("addGrade should throw an exception if if the two course names provided don't match", () => {
    expect(db.addGrade(student1, "Calculus", {course: "Statistics", grade: 83})).toThrow("UNKNOWN ERROR")
  })

  


})

// this may look undefined in TSC until you do an npm install
// and possibly restart VSC.
describe('tests for addStudent', () => {

  test('addStudent should add a student to the database', () => {
    // const db = new DataBase ()
    expect(db.nameToIDs('blair')).toEqual([])
    const id1 = db.addStudent('blair');
    expect(db.nameToIDs('blair')).toEqual([id1])
  });

  test('addStudent should return an unique ID for the new student',
    () => {
      // we'll just add 3 students and check to see that their IDs
      // are all different.
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('corey');
      const id3 = db.addStudent('delta');
      expect(id1).not.toEqual(id2)
      expect(id1).not.toEqual(id3)
      expect(id2).not.toEqual(id3)
    });

  test('the db can have more than one student with the same name',
    () => {
      const id1 = db.addStudent('blair');
      const id2 = db.addStudent('blair');
      expect(id1).not.toEqual(id2)
    })

  test('A newly-added student should have an empty transcript',
    () => {
      const id1 = db.addStudent('blair');
      const retrievedTranscript = db.getTranscript(id1)
      expect(retrievedTranscript.grades).toEqual([])
      expect(retrievedTranscript.student)
        .toEqual({
          studentID: id1, studentName: "blair"
        })
    });

  test('getTranscript should return the right transcript',
    () => {
      // add a student, getting an ID
      // add some grades for that student
      // retrieve the transcript for that ID
      // check to see that the retrieved grades are 
      // exactly the ones you added.    
    });

  test('getTranscript should throw an error when given a bad ID',
    () => {
      // in an empty database, all IDs are bad :)
      // Note: the expression you expect to throw must be wrapped in a (() => ...)
      expect(() => db.getTranscript(1)).toThrowError()
    });

    // test('getTranscript should throw an error when given a bad ID (bogus version)',
    // () => {
    //   // in an empty database, all IDs are bad :)
    //   // Note: the expression you expect to throw must be wrapped in a (() => ...)
    //   expect(db.getTranscript(1)).toThrowError()
    // });

})


