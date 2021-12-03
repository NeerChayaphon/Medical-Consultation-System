/* Doctor data model for mongodb and mongoose */

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
    default: null,
  },
  relative: {
    name: {type: String, default: null},
    phoneNumber: {type: String, default: null},
    relativeType: {type: String, default: null},
  },
  allergy: {type: String, default: null},
  bloodType: {
    type: String,
    enum: ['A', 'B', 'O', 'AB', null],
    default: null,
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
