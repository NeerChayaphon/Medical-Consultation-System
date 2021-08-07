const express = require('express');
const {Specialization} = require('../models/Specialization');
const asyncHandler = require('express-async-handler');

exports.getAllSp = asyncHandler(async (req, res) => {
  const specialization = await Specialization.find();
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: specialization.length,
    data: specialization,
  });
});

exports.getSp = asyncHandler(async (req, res) => {
  const specialization = await Specialization.findById(req.params.id);
  if (!specialization) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the specialization",
    });
  }
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    data: specialization,
  });
});

exports.createSp = asyncHandler(async (req, res) => {
  let specialization = new Specialization({
    specialization: req.body.specialization,
    detail: req.body.detail,
  });
  specialization = await specialization.save();

  res.status(201).json({
    status: 'sucess',
    data: specialization,
  });
});

exports.updateSp = asyncHandler(async (req, res) => {
  const specialization = await Specialization.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!specialization) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the specialization",
    });
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      specialization,
    },
  });
});

exports.deleteSp = asyncHandler(async (req, res, next) => {
  await Specialization.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
