/* authRoute.js use for the authorization route */

const express = require('express');
const router = express.Router();
const jwt = require('../helpers/jwt');
const asyncHandler = require('express-async-handler');

/* authorization route for token checking in the front-end */
router.route('/').get(
  jwt.userVerify(['patient','doctor','staff']),
  asyncHandler(async (req, res) => {
    res.send(res.locals);
  })
);


module.exports = router;
