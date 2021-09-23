const express = require('express');
const {Doctor} = require('../models/Doctor');
const {Specialization} = require('../models/Specialization');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APIFeatures = require('../helpers/apiFeatures');
const AppError = require('../helpers/appErrors')

// multer
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination : (req,file,cb) => {
    cb(null,'public/img/doctor');
  },
  filename : (req,file,cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null,`${req.body.name}.${ext}`)
  }
});

const multerFilter = (req,file,cb) => {
  if(file.mimetype.startsWith('image')) {
    cb(null,true)
  } else {
    cb(new AppError('Please upload only images',400),false)
  }
}

const upload = multer({
  storage : multerStorage,
  fileFilter : multerFilter
});

// image midderware
exports.uploadDoctorPhoto = upload.single('photo')

exports.getAllDoctor = asyncHandler(async (req, res) => {
  // Execute query : query.sort().select().skip().limit()
  const feature = new APIFeatures(Doctor.find().populate('specialization'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doctors = await feature.query;

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
  let id = req.params.id;
  let doctors = {};
  if (id.includes(',')) {
    let array = id.split(',');
    doctors = await Doctor.find({_id: {$in: array}}).populate('specialization');
  } else {
    doctors = await Doctor.findById(req.params.id).populate('specialization');
  }
  if (!doctors) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the doctor",
    });
  }
  res.status(200).json({
    status: 'sucess',
    result: doctors.length,
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

  console.log(req.file);
  doctor = await doctor.save();
  res.status(201).json({
    status: 'sucess',
    data: doctor,
  });
});

exports.updateDoctor = asyncHandler(async (req, res) => {
  if (req.body.specialization) {
    const specialization = await Specialization.findById(req.body.specialization);
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

exports.doctorLogin = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({email: req.body.email});
  const secret = process.env.secret;
  if (!doctor) {
    return res.status(400).send('The doctor not found');
  }
  if (doctor && bcrypt.compareSync(req.body.password, doctor.passwordHash)) {
    const token = jwt.sign(
      {
        id: doctor.id,
        type: 'doctor',
      },

      secret,
      {expiresIn: '1d'}
    );

    res.status(200).json({user: doctor.email, token: token});
  } else {
    res.status(400).json({
      status: 'fail',
      data: null,
      message: 'password is wrong!',
    });
  }
});
