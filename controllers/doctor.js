const express = require('express');
const {Doctor} = require('../models/Doctor');
const {Specialization} = require('../models/Specialization');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllDoctor = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().populate('specialization');
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: doctors.length,
    data: {
      doctors,
    },
  });
});

exports.getDoctor = asyncHandler(async (req, res) => {
  const doctors = await Doctor.findById(req.params.id).populate(
    'specialization'
  );
  if (!doctors) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the doctor",
    });
  }
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    data: doctors,
  });
});

exports.createDoctor = asyncHandler(async (req, res) => {
  const specialization = await Specialization.findById(req.body.specialization);
  if (!specialization) return res.status(400).send('Invalid specialization');

  let doctor = new Doctor({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    specialization: req.body.specialization,
    specializationDetail: req.body.specializationDetail,
    backgroud: req.body.backgroud,
    hospital: req.body.hospital,
  });
  doctor = await doctor.save();
  res.status(201).json({
    status: 'sucess',
    data: doctor,
  });
});

exports.updateDoctor = asyncHandler(async (req, res) => {
  if (req.body.specialization) {
    const specialization = await Specialization.findById(
      req.body.specialization
    );
    if (!specialization) return res.status(400).send('Invalid specialization');
  }
  const doctors = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doctors) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the doctor",
    });
  }
  res.status(200).json({
    status: 'sucess',
    data: doctors,
  });
});

exports.deleteDoctor = asyncHandler(async (req, res, next) => {
  await Doctor.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
