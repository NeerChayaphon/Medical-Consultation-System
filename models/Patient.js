const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  birthdate: {
    type: Date,
    required: true,
  },
  IDcard: {
    type: Number,
    required: true,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  relative: {
    name: String,
    phoneNumber: String,
    relativeType: String,
  },
  allergy: String,
  bloodType: {
    type: String,
    required: true,
    enum: ['A', 'B', 'O', 'AB'],
  },
});

patientSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

patientSchema.set('toJSON', {
  virtuals: true,
});

exports.Patient = mongoose.model('Patient', patientSchema);
exports.patientSchema = patientSchema;
