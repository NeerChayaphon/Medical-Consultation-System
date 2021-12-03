/* Medical record model for mongodb and mongoose */

const mongoose = require('mongoose');

const mrSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  // 2
  history: {
    type: String,
    required:true
  },
  // 3
  peDiagnosis: {
    type: String,
    required:true
  },
  illness: {
    type: String,
    default: "None",
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  followUp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FollowUp',
  },
});

mrSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

mrSchema.set('toJSON', {
  virtuals: true,
});

exports.MedicalRecord = mongoose.model('MedicalRecord', mrSchema);
exports.mrSchema = mrSchema;
