/* Doctor data model for mongodb and mongoose */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'})

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
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  photo: {type: String, default: `http://127.0.0.1:${process.env.PORT}/public/img/doctor/default.png`},
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialization',
    required: true,
  },

  specializationDetail: {
    type: String,
    required: true,
  },
  background: {
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
