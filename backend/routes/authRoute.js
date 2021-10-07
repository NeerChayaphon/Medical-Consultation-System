const express = require('express');
const patient = require('../controllers/patient');
const router = express.Router();
const jwt = require('../helpers/jwt');

router.route('/patient').get(jwt.userVerify(['patient']), patient.checkPatientLogin);

module.exports = router;
