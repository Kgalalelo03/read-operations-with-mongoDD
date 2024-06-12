const express = require("express");
const studentsRouter = express.Router();
const Student = require("../models/student");

// Add a new student
studentsRouter.post("/add", async (req, res) => {
  try {
    const { studentName, internshipStatus, outstandingSubjects } = req.body;
    
    const newStudent = new Student({
      studentName,
      internshipStatus,
      outstandingSubjects,
    });

    // Save the new student record to the database
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {

    console.error(error);
    res.status(400).json({ message: "Failed to add student record", error: error.message });
  }
});

// View all students
studentsRouter.get("/view", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to retrieve student records", error: error.message });
  }
});

// View one student record by ID
studentsRouter.get("/view/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve student record", error: error.message });
  }
});

// update a student record by ID
studentsRouter.put("/update/:id", async (req, res) => {
  let studentID = req.params.id;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentID, req.body, { new: true });
    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update student record", error: error.message });
  }
});

// delete a student by ID
studentsRouter.delete("/delete/:id", async (req, res) => {
  let studentID = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentID);
    if (deletedStudent) {
      res.status(200).json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete student record", error: error.message });
  }
});

module.exports = studentsRouter;
