const express = require('express');
const router = express.Router();
const {Patient} = require('../models/Patient');
const asyncHandler = require('express-async-handler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const patient = await Patient.find();
    if (!patient) {
      res.status(500).json({success: false});
    }
    res.send(patient);
  })
);

router.get(
  `/:id`,
  asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(500).json({success: false});
    }
    res.send(patient);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    let patient = new Patient({
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.password,
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

    if (!patient)
      return res.status(400).send('the category cannot be created!');

    res.send(patient);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) return res.status(400).send('the Patient cannot be update!');

    res.send(patient);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    await Patient.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  })
);

module.exports = router;
