const express = require('express');
const patient = require('../controllers/patient');
const router = express.Router();
const patientVerify = require('../helpers/jwt');

router.route('/patient').get(patientVerify, patient.checkPatientLogin);

module.exports = router;
