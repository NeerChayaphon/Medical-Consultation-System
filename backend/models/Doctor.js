const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {type: String, default: 'default.jpg'},
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialization',
    required: true,
  },

  specializationDetail: {
    type: String,
    required: true,
  },
  backgroud: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
});

doctorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

doctorSchema.set('toJSON', {
  virtuals: true,
});

exports.Doctor = mongoose.model('Doctor', doctorSchema);
exports.doctorSchema = doctorSchema;
