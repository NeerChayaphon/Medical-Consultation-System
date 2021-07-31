const express = require('express');
const router = express.Router();
const {Specialization} = require('../models/Specialization');
const asyncHandler = require('express-async-handler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const specialization = await Specialization.find();
    if (!specialization) {
      res.status(500).json({success: false});
    }
    res.send(specialization);
  })
);

router.get(
  `/:id`,
  asyncHandler(async (req, res) => {
    const specialization = await Specialization.findById(req.params.id);
    if (!specialization) {
      res.status(500).json({success: false});
    }
    res.send(specialization);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    let specialization = new Specialization({
      specialization: req.body.specialization,
      detail: req.body.detail,
    });
    specialization = await specialization.save();

    if (!specialization)
      return res.status(400).send('the category cannot be created!');

    res.send(specialization);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const specialization = await Specialization.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!specialization)
      return res.status(400).send('the Specialization cannot be update!');

    res.send(specialization);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    await Specialization.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  })
);

module.exports = router;
