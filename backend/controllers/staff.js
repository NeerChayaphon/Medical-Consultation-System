/********************************************************************
  doctor.js is part of controller for handleing doctor information.
  It use for managing doctor models.
********************************************************************/

const express = require('express');
const router = express.Router();
const {Staff} = require('../models/Staff');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APIFeatures = require('../helpers/apiFeatures');

// GET Request in REST API (GET ALL)
// getAllStaff() is use for getting all staff in the database
exports.getAllStaff = asyncHandler(async (req, res) => {
  // Execute query : query.sort().select().skip().limit()
  const feature = new APIFeatures(
    Staff.find().select('-passwordHash'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // Get data
  const staff = await feature.query;
  
  // return HTTP response 
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: staff.length,
    data: staff,
  });
});

// GET Request in REST API (GET by id)
// getStaff() is use for getting all staff in the database
exports.getStaff = asyncHandler(async (req, res) => {
  // Get data
  const staff = await Staff.findById(req.params.id).select('-passwordHash');
  if (!staff) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the staff",
    });
  }
  // return HTTP response
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    data: staff,
  });
});

// POST Request in REST API 
// createStaff() is use for create staff in the database
exports.createStaff = asyncHandler(async (req, res) => {
  // get staff from HTTP request
  let staff = new Staff({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    gender: req.body.gender,
    position: req.body.position,
    salary: req.body.salary
  });
  // create new staff
  staff = await staff.save();

  // return HTTP response
  res.status(201).json({
    status: 'sucess',
    data: staff,
  });
});

// PUT Request in REST API (by id)
// updateStaff() is use for update staff in the database
exports.updateStaff = asyncHandler(async (req, res) => {
  if (req.body.password) {
    req.body.passwordHash = bcrypt.hashSync(req.body.password, 10)
  }
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // return HTTP response
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

// DELETE Request in REST API (by id)
// deleteStaff() is use for update staff in the database
exports.deleteStaff = asyncHandler(async (req, res, next) => {
  await Staff.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

// checkStaffLogin() use to checking staff token information
exports.checkStaffLogin = asyncHandler(async (req, res) => {
  // set local variable to be use with other middleware
  res.send(res.locals);
});

// controller for staff Login
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
  // decrypt password have validation.
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
