const express = require('express');
const patient = require('../controllers/patient');
const doctor = require('../controllers/doctor');
const staff = require('../controllers/staff');
const router = express.Router();
const jwt = require('../helpers/jwt');
const asyncHandler = require('express-async-handler');

router.route('/').get(
  jwt.userVerify(['patient','doctor','staff']),
  asyncHandler(async (req, res) => {
    res.send(res.locals);
  })
);
// router
//   .route('/doctor')
//   .get(jwt.userVerify(['doctor']), doctor.checkDoctorLogin);
// router.route('/staff').get(jwt.userVerify(['staff']), staff.checkStaffLogin);

module.exports = router;
