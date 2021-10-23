const express = require('express');
const patient = require('../controllers/patient');
const doctor = require('../controllers/doctor')
const staff = require('../controllers/staff')
const router = express.Router();
const jwt = require('../helpers/jwt');

router.route('/patient').get(jwt.userVerify(['patient']), patient.checkPatientLogin);
router.route('/doctor').get(jwt.userVerify(['doctor']),doctor.checkDoctorLogin)
router.route('/staff').get(jwt.userVerify(['staff']),staff.checkStaffLogin)

module.exports = router;
