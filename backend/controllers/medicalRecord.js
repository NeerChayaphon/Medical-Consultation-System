/********************************************************************
  medicalRecord.js is part of controller for handleing medical record information.
  It use for managing medical record models.
********************************************************************/


const express = require('express');
const {Doctor} = require('../models/Doctor');
const {Patient} = require('../models/Patient');
const {MedicalRecord} = require('../models/MedicalRecord');
const asyncHandler = require('express-async-handler');
const {FollowUp} = require('../models/FollowUp');
const APIFeatures = require('../helpers/apiFeatures');

// GET Request in REST API (GET ALL)
// getAllMedicalRecord() is use for getting all medical record in the database
exports.getAllMedicalRecord = asyncHandler(async (req, res) => {
  // Execute query : query.sort().select().skip().limit()
  const feature = new APIFeatures(
    MedicalRecord.find().populate('doctor', ['name','photo']).populate('patient', 'name'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // Get data
  const medicalRecord = await feature.query;
  
  // return HTTP response
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: medicalRecord.length,
    data: medicalRecord,
  });
});

// GET Request in REST API (GET by id)
// getAllMedicalRecord() is use for getting all medical record in the database
exports.getMedicalRecord = asyncHandler(async (req, res) => {
  // Get data
  const medicalRecord = await MedicalRecord.findById(req.params.id)
    .populate('doctor', 'name')
    .populate('patient', 'name');
  if (!medicalRecord) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the medical record",
    });
  }
  // check for user type
  if (
    (res.locals.id == medicalRecord.patient._id &&
      res.locals.type == 'patient') ||
    res.locals.type == 'doctor' ||
    res.locals.type == 'staff'
  ) {
    // if user type is correct return HTTP response
    res.status(200).json({
      status: 'sucess',
      DateTime: req.requestTime,
      data: medicalRecord,
    });
  } else {
    res.status(400).json({message: "You don't have autherize"});
  }
});

// POST Request in REST API 
// createMedicalRecord() is use for create medical record in the database
exports.createMedicalRecord = asyncHandler(async (req, res) => {
  // get doctor
  const doctor = await Doctor.findById(req.body.doctor);
  if (!doctor) return res.status(400).send('Invalid doctor ID');

  // get patient 
  const patient = await Patient.findById(req.body.patient);
  if (!patient) return res.status(400).send('Invalid patient ID');

  let medicalRecord;

  // get followup (Will be impliment in the future)
  if (req.body.followUp) {
    const followUp = await FollowUp.create(req.body.followUp);
    if (!followUp)
      return res.status(400).send('the followUp cannot be created!');

    // Add new Medical record
    medicalRecord = new MedicalRecord({
      doctor: req.body.doctor,
      patient: req.body.patient,
      history: req.body.history,
      peDiagnosis: req.body.peDiagnosis,
      treatment: req.body.treatment,
      followUp: followUp._id,
      illness: req.body.illness,
    });
    medicalRecord = await medicalRecord.save();
  } else {
    medicalRecord = await MedicalRecord.create(req.body);
  }

  // return HTTP response
  res.status(201).json({
    status: 'sucess',
    data: medicalRecord,
  });
});

// PUT Request in REST API (by id)
// updateMedicalRecord() is use for update medical record in the database
exports.updateMedicalRecord = asyncHandler(async (req, res) => {
  // get doctor from HTTP request
  if (req.body.doctor) {
    const doctor = await Doctor.findById(req.body.doctor);
    if (!doctor) return res.status(400).send('Invalid doctor');
  }
  // get patient from HTTP request
  if (req.body.patient) {
    const patient = await Patient.findById(req.body.patient);
    if (!patient) return res.status(400).send('Invalid patient');
  }

  // find and update
  const medicalRecord = await MedicalRecord.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!medicalRecord) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the medical record",
    });
  }

  // return HTTP reponse
  res.status(200).json({
    status: 'sucess',
    data: {
      medicalRecord,
    },
  });
});

// DELETE Request in REST API (by id)
// deleteMedicalRecord() is use for update medical record in the database
exports.deleteMedicalRecord = asyncHandler(async (req, res, next) => {
  // find and delete
  await MedicalRecord.findByIdAndDelete(req.params.id);

  // return HTTP response
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
