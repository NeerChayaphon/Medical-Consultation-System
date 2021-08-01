const express = require('express');
const router = express.Router();
const {Patient} = require('../models/Patient');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.find().select('-passwordHash');
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: patient.length,
    data: patient,
  });
});

exports.getPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id).select('-passwordHash');
  if (!patient) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the patient",
    });
  }
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    data: patient,
  });
});

exports.createPatient = asyncHandler(async (req, res) => {
  let patient = new Patient({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    IDcard: req.body.IDcard,
    currentAddress: req.body.currentAddress,
    relative: req.body.relative,
    allergy: req.body.allergy,
    bloodType: req.body.bloodType,
  });
  patient = await patient.save();

  res.status(201).json({
    status: 'sucess',
    data: patient,
  });
});

exports.updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!patient) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the patient",
    });
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      patient,
    },
  });
});

exports.deletePatient = asyncHandler(async (req, res, next) => {
  await Patient.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

exports.patientLogin = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({email: req.body.email});
  const secret = process.env.secret;
  if (!patient) {
    return res.status(400).send('The patient not found');
  }
  if (patient && bcrypt.compareSync(req.body.password, patient.passwordHash)) {
    const token = jwt.sign(
      {
        userId: patient.id,
        isDoctor: false,
        isPatient: true,
      },

      secret,
      {expiresIn: '1d'}
    );

    res.status(200).send({user: patient.email, token: token});
  } else {
    res.status(400).send('password is wrong!');
  }
});
