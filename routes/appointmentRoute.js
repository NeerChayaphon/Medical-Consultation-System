const express = require('express');
const router = express.Router();
const {Doctor} = require('../models/Doctor');
const {Patient} = require('../models/Patient');
const {Appointment} = require('../models/Appointment');
const asyncHandler = require('express-async-handler');
const {FollowUp} = require('../models/FollowUp');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const appointment = await Appointment.find()
      .populate('doctor', 'name')
      .populate('patient', 'name');
    if (!appointment) {
      res.status(500).json({success: false});
    }
    res.send(appointment);
  })
);

router.get(
  `/:id`,
  asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctor', 'name')
      .populate('patient', 'name');
    if (!appointment) {
      res.status(500).json({success: false});
    }
    res.send(appointment);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.body.doctor);
    if (!doctor) return res.status(400).send('Invalid doctor ID');

    const patient = await Patient.findById(req.body.patient);
    if (!patient) return res.status(400).send('Invalid patient ID');

    let appointment;

    if (req.body.followUp) {
      const followUp = await FollowUp.create(req.body.followUp);
      if (!followUp)
        return res.status(400).send('the followUp cannot be created!');
      appointment = new Appointment({
        doctor: req.body.doctor,
        patient: req.body.patient,
        history: req.body.history,
        peDiagnosis: req.body.peDiagnosis,
        treatment: req.body.treatment,
        followUp: followUp._id,
      });
      appointment = await appointment.save();
    } else {
      appointment = await Appointment.create(req.body);
    }

    if (!appointment)
      return res.status(400).send('the appointment cannot be created!');

    res.send(appointment);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    if (req.body.doctor) {
      const doctor = await Doctor.findById(req.body.doctor);
      if (!doctor) return res.status(400).send('Invalid doctor');
    }
    if (req.body.patient) {
      const patient = await Patient.findById(req.body.patient);
      if (!patient) return res.status(400).send('Invalid patient');
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!appointment)
      return res.status(400).send('the Doctor cannot be update!');

    res.send(appointment);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    await Appointment.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  })
);

module.exports = router;
