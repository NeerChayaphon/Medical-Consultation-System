const express = require('express');
const patient = require('../controllers/patient');
const router = express.Router();

router.route('/').get(patient.getAllPatient).post(patient.createPatient); // chain route

router
  .route('/:id')
  .get(patient.getPatient)
  .put(patient.updatePatient)
  .delete(patient.deletePatient);

router.route('/register').post(patient.createPatient);
router.route('/login').post(patient.patientLogin);

module.exports = router;
