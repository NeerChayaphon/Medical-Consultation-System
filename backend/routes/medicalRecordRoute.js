/* medicalRecordRoute.js use for the medical record route to handle to use with controller */

const express = require('express');
const medicalRecord = require('../controllers/medicalRecord');
const router = express.Router();
const jwt = require('../helpers/jwt');

// path = "/"
router
  .route('/')
  .get(
    jwt.userVerify(['patient', 'doctor', 'staff']),
    medicalRecord.getAllMedicalRecord
  ) // get all medical record route
  .post(jwt.userVerify(['doctor', 'staff']), medicalRecord.createMedicalRecord); // create medical record

// path = "/:id"
router
  .route('/:id')
  .get(
    jwt.userVerify(['patient', 'doctor', 'staff']),
    medicalRecord.getMedicalRecord
  ) // get medical record by id
  .put(jwt.userVerify(['doctor', 'staff']),medicalRecord.updateMedicalRecord) // update medical record by id
  .delete(jwt.userVerify(['doctor', 'staff']),medicalRecord.deleteMedicalRecord); // delete medical record by id

module.exports = router;
