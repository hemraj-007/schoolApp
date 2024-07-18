const Teacher = require('../models/teacherModel');

exports.createTeacher = async (req, res) => {
  const { name, gender, DOB, contact_details, salary, assigned_class } = req.body;
  try {
    const newTeacher = new Teacher({ name, gender, DOB, contact_details, salary, assigned_class });
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(400).json({ message: 'Error creating teacher', error });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('assigned_class');
    res.status(200).json(teachers);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching teachers', error });
  }
};

exports.getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id).populate('assigned_class');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching teacher', error });
  }
};

exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, gender, DOB, contact_details, salary, assigned_class } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, { name, gender, DOB, contact_details, salary, assigned_class }, { new: true });
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: 'Error updating teacher', error });
  }
};

exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting teacher', error });
  }
};
