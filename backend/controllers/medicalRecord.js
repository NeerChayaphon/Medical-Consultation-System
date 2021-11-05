const express = require('express');
const {Doctor} = require('../models/Doctor');
const {Patient} = require('../models/Patient');
const {MedicalRecord} = require('../models/MedicalRecord');
const asyncHandler = require('express-async-handler');
const {FollowUp} = require('../models/FollowUp');
const APIFeatures = require('../helpers/apiFeatures');

exports.getAllMedicalRecord = asyncHandler(async (req, res) => {
  const feature = new APIFeatures(
    MedicalRecord.find().populate('doctor', ['name','photo']).populate('patient', 'name'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const medicalRecord = await feature.query;
  // const medicalRecord = await MedicalRecord.find()
  //   .populate('doctor', 'name')
  //   .populate('patient', 'name');
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: medicalRecord.length,
    data: medicalRecord,
  });
});

exports.getMedicalRecord = asyncHandler(async (req, res) => {
  const medicalRecord = await MedicalRecord.findById(req.params.id)
    .populate('doctor', 'name')
    .populate('patient', 'name');
  if (!medicalRecord) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the medical record",
    });
  }
  if (
    (res.locals.id == medicalRecord.patient._id &&
      res.locals.type == 'patient') ||
    res.locals.type == 'doctor' ||
    res.locals.type == 'staff'
  ) {
    res.status(200).json({
      status: 'sucess',
      DateTime: req.requestTime,
      data: medicalRecord,
    });
  } else {
    res.status(400).json({message: "You don't have autherize"});
  }
});

exports.createMedicalRecord = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.body.doctor);
  if (!doctor) return res.status(400).send('Invalid doctor ID');

  const patient = await Patient.findById(req.body.patient);
  if (!patient) return res.status(400).send('Invalid patient ID');

  let medicalRecord;

  if (req.body.followUp) {
    const followUp = await FollowUp.create(req.body.followUp);
    if (!followUp)
      return res.status(400).send('the followUp cannot be created!');
    medicalRecord = new MedicalRecord({
      doctor: req.body.doctor,
      patient: req.body.patient,
      history: req.body.history,
      peDiagnosis: req.body.peDiagnosis,
      treatment: req.body.treatment,
      followUp: followUp._id,
    });
    medicalRecord = await medicalRecord.save();
  } else {
    medicalRecord = await MedicalRecord.create(req.body);
  }

  res.status(201).json({
    status: 'sucess',
    data: medicalRecord,
  });
});

exports.updateMedicalRecord = asyncHandler(async (req, res) => {
  if (req.body.doctor) {
    const doctor = await Doctor.findById(req.body.doctor);
    if (!doctor) return res.status(400).send('Invalid doctor');
  }
  if (req.body.patient) {
    const patient = await Patient.findById(req.body.patient);
    if (!patient) return res.status(400).send('Invalid patient');
  }

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
  res.status(200).json({
    status: 'sucess',
    data: {
      medicalRecord,
    },
  });
});

exports.deleteMedicalRecord = asyncHandler(async (req, res, next) => {
  await MedicalRecord.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
