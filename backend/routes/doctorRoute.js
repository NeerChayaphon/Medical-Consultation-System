const express = require('express');
const doctor = require('../controllers/doctor');
const router = express.Router();
const jwt = require('../helpers/jwt');

router
  .route('/')
  .get(jwt.userVerify(['patient', 'staff']), doctor.getAllDoctor)
  .post(
    [jwt.userVerify(['staff']), doctor.uploadDoctorPhoto],
    doctor.createDoctor
  ); // chain route

router
  .route('/:id')
  .get(
    [
      jwt.userVerify(['patient', 'doctor', 'staff']),
      jwt.userVerifyId(['doctor']),
    ],
    doctor.getDoctor
  )
  .put(
    [jwt.userVerify(['doctor', 'staff']), jwt.userVerifyId(['doctor'])],
    doctor.updateDoctor
  )
  .delete(jwt.userVerify(['staff']), doctor.deleteDoctor);

router.route('/login').post(doctor.doctorLogin);

module.exports = router;
