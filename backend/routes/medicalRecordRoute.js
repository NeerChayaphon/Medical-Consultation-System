const express = require('express');
const medicalRecord = require('../controllers/medicalRecord');
const router = express.Router();
const jwt = require('../helpers/jwt');

router
  .route('/')
  .get(
    jwt.userVerify(['patient', 'doctor', 'staff']),
    medicalRecord.getAllMedicalRecord
  )
  .post(jwt.userVerify(['doctor', 'staff']), medicalRecord.createMedicalRecord); // chain route

router
  .route('/:id')
  .get(
    jwt.userVerify(['patient', 'doctor', 'staff']),
    medicalRecord.getMedicalRecord
  )
  .put(jwt.userVerify(['doctor', 'staff']),medicalRecord.updateMedicalRecord)
  .delete(jwt.userVerify(['doctor', 'staff']),medicalRecord.deleteMedicalRecord);

module.exports = router;
