const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  internshipStatus: {
    type: String,
    required: true,
    enum: ['placed', 'unplaced', 'unknown']
  },
  outstandingSubjects: {
    type: Number,
    required: true,
    default: 0
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
