const express = require('express');
const appointment = require('../controllers/appointment');
const router = express.Router();

router
  .route('/')
  .get(appointment.getAllAppointment)
  .post(appointment.createAppointment); // chain route

router
  .route('/:id')
  .get(appointment.getAppointment)
  .put(appointment.updateAppointment)
  .delete(appointment.deleteAppointment);

module.exports = router;
