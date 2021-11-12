const express = require('express');
const router = express.Router();
const {Staff} = require('../models/Staff');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APIFeatures = require('../helpers/apiFeatures');

exports.getAllStaff = asyncHandler(async (req, res) => {
  const feature = new APIFeatures(
    Staff.find().select('-passwordHash'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const staff = await feature.query;
  
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: staff.length,
    data: staff,
  });
});

exports.getStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id).select('-passwordHash');
  if (!staff) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the staff",
    });
  }
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    data: staff,
  });
});

exports.createStaff = asyncHandler(async (req, res) => {
  let staff = new Staff({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    gender: req.body.gender,
    position: req.body.position,
    salary: req.body.salary
  });
  staff = await staff.save();

  res.status(201).json({
    status: 'sucess',
    data: staff,
  });
});

exports.updateStaff = asyncHandler(async (req, res) => {
  if (req.body.password) {
    req.body.passwordHash = bcrypt.hashSync(req.body.password, 10)
  }
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!staff) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the staff",
    });
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      staff,
    },
  });
});

exports.deleteStaff = asyncHandler(async (req, res, next) => {
  await Staff.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

exports.checkStaffLogin = asyncHandler(async (req, res) => {
  // res.send(req.body);
  res.send(res.locals);
});

exports.staffLogin = asyncHandler(async (req, res) => {
  const staff = await Staff.findOne({email: req.body.email});
  const secret = process.env.secret;
  if (!staff) {
    return res.status(400).json({
      status: 'fail',
      data: null,
      message: 'Incorrent Email or Password',
    });
  }
  if (staff && bcrypt.compareSync(req.body.password, staff.passwordHash)) {
    const token = jwt.sign(
      {
        id: staff.id,
        type: 'staff',
      },

      secret
    );

    res.status(200).json({user: staff.email, token: token});
  } else {
    res.status(400).json({
      status: 'fail',
      data: null,
      message: 'Incorrent Email or Password',
    });
  }
});
