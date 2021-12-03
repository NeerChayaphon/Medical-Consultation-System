/* Staff data model for mongodb and mongoose */

const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
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
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

staffSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

staffSchema.set('toJSON', {
  virtuals: true,
});

exports.Staff = mongoose.model('Staff', staffSchema);
exports.staffSchema = staffSchema;
