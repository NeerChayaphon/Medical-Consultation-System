/* patientRoute.js use for the patient route to handle to use with controller */

const express = require('express');
const patient = require('../controllers/patient');
const router = express.Router();
const jwt = require('../helpers/jwt');

// path = "/"
router
  .route('/')
  .get(jwt.userVerify(['doctor', 'staff']), patient.getAllPatient) // get all patient
  .post(jwt.userVerify(['patient', 'doctor', 'staff']), patient.createPatient); // create patient

// path = "/:id"
router
  .route('/:id')
  .get(
    [
      jwt.userVerify(['patient', 'doctor', 'staff']),
      jwt.userVerifyId(['patient']),
    ],
    patient.getPatient
  ) // get patient by id
  .put(
    [jwt.userVerify(['patient', 'staff']), jwt.userVerifyId(['patient'])],
    patient.updatePatient
  ) // update patient by id
  .delete(jwt.userVerify(['staff']), patient.deletePatient); // delete patient by id

router.route('/register').post(patient.createPatient); // register patient route
router.route('/login').post(patient.patientLogin); // patient login route

module.exports = router;
