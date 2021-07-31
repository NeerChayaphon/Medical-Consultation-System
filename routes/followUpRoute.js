const express = require('express');
const router = express.Router();
const {FollowUp} = require('../models/FollowUp');
const asyncHandler = require('express-async-handler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const followUp = await FollowUp.find();
    if (!followUp) {
      res.status(500).json({success: false});
    }
    res.send(followUp);
  })
);

router.get(
  `/:id`,
  asyncHandler(async (req, res) => {
    const followUp = await FollowUp.findById(req.params.id);
    if (!followUp) {
      res.status(500).json({success: false});
    }
    res.send(followUp);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const followUp = await FollowUp.create(req.body);

    if (!followUp)
      return res.status(400).send('the category cannot be created!');

    res.send(followUp);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const followUp = await FollowUp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!followUp)
      return res.status(400).send('the FollowUp cannot be update!');

    res.send(followUp);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    await FollowUp.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'sucess',
      data: null,
    });
  })
);

module.exports = router;
