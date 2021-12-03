/********************************************************************
  followUp.js is a working progress file of this project.
  It is the feature that we will impliment in the future and not part of
  this project period.
********************************************************************/

const express = require('express');
const router = express.Router();
const {FollowUp} = require('../models/FollowUp');
const asyncHandler = require('express-async-handler');

// GET ALLL
exports.getAllFollowUp = asyncHandler(async (req, res) => {
  const followUp = await FollowUp.find();
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: followUp.length,
    data: followUp,
  });
});

// GET by ID
exports.getFollowUp = asyncHandler(async (req, res) => {
  const followUp = await FollowUp.findById(req.params.id);
  if (!followUp) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the followUp",
    });
  }
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    data: followUp,
  });
});

// POST
exports.createFollowUp = asyncHandler(async (req, res) => {
  const followUp = await FollowUp.create(req.body);
  res.status(201).json({
    status: 'sucess',
    data: followUp,
  });
});

// PUT
exports.updateFollowUp = asyncHandler(async (req, res, next) => {
  const followUp = await FollowUp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!followUp) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the followUp",
    });
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      followUp,
    },
  });
});

// DELETE
exports.deleteFollowUp = asyncHandler(async (req, res, next) => {
  await FollowUp.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
