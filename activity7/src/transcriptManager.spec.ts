import * as db from "./transcriptManager";

/*
Tests for the Transcript Manager. 
 */
describe('TranscriptManager', () => {

  beforeEach(() => {
    // Before any test runs, clean up the datastore. This should ensure that tests are hermetic.
    db.initialize();
  })

  describe('Create student', () => {
    it('should return an ID, starting with 1', () => {
      const ret = db.addStudent('avery');
      expect(ret).toEqual(1);
    });
    it('should return an ID and add empty transcript', () => {
      const ret = db.addStudent('blake');
      expect(ret).toEqual(2);
      expect(db.getTranscript(2)?.grades).toEqual([]);
    });
  })

  describe('Adding grades', () => {
    it('should add the grade to the transcript', () => {
      const studentID = db.addStudent('test student');
      db.addGrade(studentID, 'test course', 100);
      const grade = db.getGrade(studentID, 'test course');
      expect(grade).toBe(100);
    })
    it('Should throw an error if student already has a grade', () => {
      const studentID = db.addStudent('test student');
      db.addGrade(studentID, 'test course', 100);
      expect(() => db.addGrade(studentID, 'test course', 95)).toThrowError(`student ${studentID} already has a grade in course test course`);
    })
    it('Should throw an error if the student ID is invalid', () =>{
      expect(() => db.addGrade(1, 'test course', 100)).toThrowError(`no student with ID = 1`);
    });
    it('Should throw an error if the student ID does not exist', () =>{
      db.addStudent('test student', []);
      expect(() => db.addGrade(10, 'test course', 100)).toThrowError(`no student with ID = 10`);
    });
  })
  describe('Add grade to transcript', () => {
    it('Should throw an error if grade is already on transcript', () => {
      const studentID = db.addStudent('test student', [{ course: 'math', grade: 100 }]);
      expect(() => db.addGradeToTranscript(db.getTranscript(studentID) as db.Transcript, 'math', 100)).toThrowError();
    })
    it('Should add grade to transcript', () => {
      const studentID = db.addStudent('test student', [{ course: 'math', grade: 100 }]);
      const { grades } = db.getTranscript(studentID) as db.Transcript;
      const addedGrades = grades.concat({ course: 'science', grade: 90 });
      expect(db.addGradeToTranscript(db.getTranscript(studentID) as db.Transcript, 'science', 90)).toEqual({ student: db.getTranscript(studentID)?.student as db.Student, grades: addedGrades});
    })
  })
  describe('Get grade', () => {
    it('Should throw an error if student does not have grade', () => {
      const studentID = db.addStudent('test student');
      expect(() => db.getGrade(studentID, 'math')).toThrowError(`no grade for student ${studentID} in course math`);
    })
    it('Should throw an error if student does not exist', () => {
      expect(() => db.getGrade(10, 'math')).toThrowError(`no grade for student 10 in course math`);
    })
    it('Should get grade for student and course', () => {
      const studentID = db.addStudent('test student', [{ course: 'math', grade: 100 }]);
      expect(db.getGrade(studentID, 'math')).toEqual(100);
    })
    it('Should throw an error if the student ID does not exist', () => {
      db.addStudent('test student', [{ course: 'math', grade: 100 }]);
      expect(() => db.getGrade(100, 'math')).toThrowError(`no grade for student 100 in course math`);
    });
    it('Should throw an error if the course does not exist', () => {
      const id = db.addStudent('test student', [{ course: 'math', grade: 100 }]);
      expect(() => db.getGrade(id, 'science')).toThrowError(`no grade for student ${id} in course science`);
    });
  })
  describe('getStudentIDs', () => {
    it('Should return only the students who match the name', () => {
      const avery1 = db.addStudent('avery');
      const avery2 = db.addStudent('avery');
      const ripley = db.addStudent('ripley');

      //Probably should be checking if arrays contain same set of IDs, permitting different orders...
      expect(db.getStudentIDs('avery')).toEqual([avery1, avery2]);
      expect(db.getStudentIDs('ripley')).toEqual([ripley]);
    })
  });
  describe('Getting transcript of new student', () => {
    it('Transcript should be empty', () => {
      const avery1 = db.addStudent('avery');
      expect(db.getTranscript(avery1)?.grades.length === 0);

    })
  })
  describe('Deleting students', () => {
    it('Should result in the students\' transcript no longer being available', () => {
      const studentID = db.addStudent('test student');
      db.deleteStudent(studentID);
      expect(db.getTranscript(studentID)).toBeUndefined();
    })
    it('Should throw an error if the ID is invalid', ()=>{
      expect(()=>db.deleteStudent(10)).toThrowError(`no student with ID = 10`);
    })
    it('Should throw an error if the student ID does not exist', () =>{
      db.addStudent('test student', []);
      expect(() => db.deleteStudent(3)).toThrowError(`no student with ID = 3`);
    });
  })
  describe('getAll', () => {
    it('Should return the transcripts', () => {
      expect(db.getAll()).toEqual([]);
    });
  });
});
