/* ** This is part of future development and not part of this project** */
/* followUp data model for mongodb and mongoose */

const mongoose = require('mongoose');
const followUpSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

followUpSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

followUpSchema.set('toJSON', {
  virtuals: true,
});

exports.FollowUp = mongoose.model('FollowUp', followUpSchema);
exports.followUpSchema = followUpSchema;
