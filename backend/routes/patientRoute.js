const express = require('express');
const patient = require('../controllers/patient');
const router = express.Router();
const jwt = require('../helpers/jwt');

router
  .route('/')
  .get(jwt.userVerify(['doctor', 'staff']), patient.getAllPatient)
  .post(jwt.userVerify(['patient', 'doctor', 'staff']), patient.createPatient); // chain route

router
  .route('/:id')
  .get(
    [
      jwt.userVerify(['patient', 'doctor', 'staff']),
      jwt.userVerifyId(['patient']),
    ],
    patient.getPatient
  )
  .put(
    [jwt.userVerify(['patient', 'staff']), jwt.userVerifyId(['patient'])],
    patient.updatePatient
  )
  .delete(jwt.userVerify(['staff']), patient.deletePatient);

router.route('/register').post(patient.createPatient);
router.route('/login').post(patient.patientLogin);

module.exports = router;
