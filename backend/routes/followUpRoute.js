/* This is part of the future development part */
const express = require('express');
const followUp = require('../controllers/followUp');
const router = express.Router();

router.route('/').get(followUp.getAllFollowUp).post(followUp.createFollowUp); // chain route

router
  .route('/:id')
  .get(followUp.getFollowUp)
  .put(followUp.updateFollowUp)
  .delete(followUp.deleteFollowUp);

module.exports = router;
