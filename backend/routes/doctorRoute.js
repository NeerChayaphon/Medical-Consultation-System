/* doctorRoute.js use for the doctor route to handle to use with controller */

const express = require('express');
const doctor = require('../controllers/doctor');
const router = express.Router();
const jwt = require('../helpers/jwt');

// path = "/"
router
  .route('/')
  .get(jwt.userVerify(['patient', 'staff']), doctor.getAllDoctor) // get all doctor route
  .post(
    [jwt.userVerify(['staff']), doctor.uploadDoctorPhoto],
    doctor.createDoctor
  ); // add doctor route

// path = "/:id"
router
  .route('/:id')
  .get(
    [
      jwt.userVerify(['patient', 'doctor', 'staff']),
      jwt.userVerifyId(['doctor']),
    ],
    doctor.getDoctor
  ) // get doctor by id route
  .put(
    [jwt.userVerify(['doctor', 'staff']), jwt.userVerifyId(['doctor']),doctor.uploadDoctorPhoto],
    doctor.updateDoctor
  ) // update doctor by id route
  .delete(jwt.userVerify(['staff']), doctor.deleteDoctor); // delete doctor by id route

router.route('/login').post(doctor.doctorLogin); // doctor login

module.exports = router;
