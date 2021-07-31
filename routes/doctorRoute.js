const express = require('express');
const router = express.Router();
const {Doctor} = require('../models/Doctor');
const {Specialization} = require('../models/Specialization');
const asyncHandler = require('express-async-handler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const doctors = await Doctor.find().populate('specialization');
    if (!doctors) {
      res.status(500).json({success: false});
    }
    res.send(doctors);
  })
);

router.get(
  `/:id`,
  asyncHandler(async (req, res) => {
    const doctors = await Doctor.findById(req.params.id).populate(
      'specialization'
    );
    if (!doctors) {
      res.status(500).json({success: false});
    }
    res.send(doctors);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const specialization = await Specialization.findById(
      req.body.specialization
    );
    if (!specialization) return res.status(400).send('Invalid specialization');

    let doctor = new Doctor({
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.password,
      phone: req.body.phone,
      specialization: req.body.specialization,
      specializationDetail: req.body.specializationDetail,
      backgroud: req.body.backgroud,
      hospital: req.body.hospital,
    });
    doctor = await doctor.save();

    if (!doctor) return res.status(400).send('the doctor cannot be created!');

    res.send(doctor);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    if (req.body.specialization) {
      const specialization = await Specialization.findById(
        req.body.specialization
      );
      if (!specialization)
        return res.status(400).send('Invalid specialization');
    }

    const doctors = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doctors) return res.status(400).send('the Doctor cannot be update!');

    res.send(doctors);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    await Doctor.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  })
);

module.exports = router;
