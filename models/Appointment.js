const mongoose = require('mongoose');

const apSchema = new mongoose.Schema({
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
    chiefComplaint: {
      symptom: {type: String, required: true},
      symptomPeriod: {type: String, required: true},
    },
    presentIllness: {
      type: String,
      required: true,
    },
    underlyingDisease: {
      type: String,
      required: true,
    },
    passIllness: {
      type: String,
      required: true,
    },
    drugAllergy: {
      type: String,
      required: true,
    },
    historyFactor: {
      type: String,
      required: true,
    },
    drug: {
      smoke: {type: Boolean, required: true},
      alcoho: {type: Boolean, required: true},
    },
  },
  // 3
  peDiagnosis: {
    examDate: {
      type: Date,
      default: Date.now,
    },
    PE: {
      type: String,
      required: true,
    },
    Diagnosis: {
      type: String,
      required: true,
    },
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

apSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

apSchema.set('toJSON', {
  virtuals: true,
});

exports.Appointment = mongoose.model('Appointment', apSchema);
exports.apSchema = apSchema;
