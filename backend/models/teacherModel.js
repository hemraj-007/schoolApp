const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  DOB: { type: Date, required: true },
  contact_details: { type: String, required: true },
  salary: { type: Number, required: true },
  assigned_class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
});

module.exports = mongoose.model('Teacher', teacherSchema);
