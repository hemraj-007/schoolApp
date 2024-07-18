const Student = require('../models/studentModel');

exports.createStudent = async (req, res) => {
  const { name, gender, DOB, contact_details, fees_paid, class: classId } = req.body;
  try {
    const newStudent = new Student({ name, gender, DOB, contact_details, fees_paid, class: classId });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating student', error });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('class');
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching students', error });
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id).populate('class');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching student', error });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, gender, DOB, contact_details, fees_paid, class: classId } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, { name, gender, DOB, contact_details, fees_paid, class: classId }, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting student', error });
  }
};
