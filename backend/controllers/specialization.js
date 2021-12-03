/********************************************************************
  specialization.js is part of controller for handleing doctor's specialization information.
  It use for managing specialization models.
********************************************************************/

const express = require('express');
const {Specialization} = require('../models/Specialization');
const asyncHandler = require('express-async-handler');
const APIFeatures = require('../helpers/apiFeatures');

// GET Request in REST API (GET ALL)
// getAllSp() is use for getting all specialization in the database
exports.getAllSp = asyncHandler(async (req, res) => {
  // Execute query : query.sort().select().skip().limit()
  const feature = new APIFeatures(
    Specialization.find(),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // Get data
  const specialization = await feature.query;

  // return HTTP response 
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    result: specialization.length,
    data: specialization,
  });
});

// GET Request in REST API (GET by id)
// getSp() is use for getting all specialization in the database
exports.getSp = asyncHandler(async (req, res) => {
  // Get data
  const specialization = await Specialization.findById(req.params.id);
  if (!specialization) {
    return res.status(404).json({
      status: 'fail',
      message: "can't find the specialization",
    });
  }
  // return HTTP response
  res.status(200).json({
    status: 'sucess',
    DateTime: req.requestTime,
    data: specialization,
  });
});

// POST Request in REST API 
// createSp() is use for create specialization in the database
exports.createSp = asyncHandler(async (req, res) => {
  let specialization = new Specialization({
    specialization: req.body.specialization,
    detail: req.body.detail,
  });
  // create new specialization
  specialization = await specialization.save();

  // return HTTP response
  res.status(201).json({
    status: 'sucess',
    data: specialization,
  });
});

// PUT Request in REST API (by id)
// updateSp() is use for update specialization in the database
exports.updateSp = asyncHandler(async (req, res) => {
  // find and update
  const specialization = await Specialization.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  // return HTTP response
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

// DELETE Request in REST API (by id)
// deleteSp() is use for update specialization in the database
exports.deleteSp = asyncHandler(async (req, res, next) => {
  // find and delete
  await Specialization.findByIdAndDelete(req.params.id);
  // return HTTP response
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
