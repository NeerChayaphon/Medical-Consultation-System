const express = require('express');
const patient = require('../controllers/patient');
const router = express.Router();
const jwt = require('../helpers/jwt');

router
  .route('/')
  .get(jwt.userVerify(['doctor', 'admin']), patient.getAllPatient)
  .post(jwt.userVerify(['patient', 'doctor', 'admin']), patient.createPatient); // chain route

router
  .route('/:id')
  .get(
    [
      jwt.userVerify(['patient', 'doctor', 'admin']),
      jwt.userVerifyId(['patient']),
    ],
    patient.getPatient
  )
  .put(
    [jwt.userVerify(['patient', 'admin']), jwt.userVerifyId(['patient'])],
    patient.updatePatient
  )
  .delete(jwt.userVerify(['admin']), patient.deletePatient);

router.route('/register').post(patient.createPatient);
router.route('/login').post(patient.patientLogin);

module.exports = router;
