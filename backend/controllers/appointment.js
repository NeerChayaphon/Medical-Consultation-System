const express = require('express');
const {Doctor} = require('../models/Doctor');
const {Patient} = require('../models/Patient');
const {Appointment} = require('../models/Appointment');
const asyncHandler = require('express-async-handler');
const {FollowUp} = require('../models/FollowUp');

exports.getAllAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.find()
    .populate('doctor', 'name')
    .populate('patient', 'name');
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: appointment.length,
    data: appointment,
  });
});

exports.getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('doctor', 'name')
    .populate('patient', 'name');
  if (!appointment) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the appointment",
    });
  }
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    data: appointment,
  });
});

exports.createAppointment = asyncHandler(async (req, res) => {
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

  res.status(201).json({
    status: 'sucess',
    data: appointment,
  });
});

exports.updateAppointment = asyncHandler(async (req, res) => {
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

  if (!appointment) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the appointment",
    });
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      appointment,
    },
  });
});

exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  await Appointment.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
