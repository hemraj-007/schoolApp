const Class=require('../models/classModel');

// Create a new class
exports.createClass = async (req, res) => {
    const { class_name, year, teacher, student_fees, student_list } = req.body;
    try {
      const newClass = new Class({ class_name, year, teacher, student_fees, student_list });
      const savedClass = await newClass.save();
      res.status(201).json(savedClass);
    } catch (error) {
      res.status(400).json({ message: 'Error creating class', error });
    }
  };
  
  // Get all classes
  exports.getClasses = async (req, res) => {
    try {
      const classes = await Class.find().populate('teacher').populate('student_list');
      res.status(200).json(classes);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching classes', error });
    }
  };
  
  // Get a class by ID
  exports.getClassById = async (req, res) => {
    const { id } = req.params;
    try {
      const classData = await Class.findById(id).populate('teacher student_list');
      if (!classData) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json(classData);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching class', error });
    }
  };
  
  // Update a class
  exports.updateClass = async (req, res) => {
    const { id } = req.params;
    const { class_name, year, teacher, student_fees, student_list } = req.body;
    try {
      const updatedClass = await Class.findByIdAndUpdate(id, { class_name, year, teacher, student_fees, student_list }, { new: true });
      if (!updatedClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json(updatedClass);
    } catch (error) {
      res.status(400).json({ message: 'Error updating class', error });
    }
  };
  
  // Delete a class
  exports.deleteClass = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedClass = await Class.findByIdAndDelete(id);
      if (!deletedClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting class', error });
    }
  };