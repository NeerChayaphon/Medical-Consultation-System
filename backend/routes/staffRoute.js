const express = require('express');
const staff = require('../controllers/staff');
const router = express.Router();
const jwt = require('../helpers/jwt');

router
  .route('/')
  .get(jwt.userVerify(['staff']), staff.getAllStaff)
  .post(jwt.userVerify(['staff']), staff.createStaff); // chain route

router
  .route('/:id')
  .get(jwt.userVerify(['staff']), staff.getStaff)
  .put(jwt.userVerify(['staff']), staff.updateStaff)
  .delete(jwt.userVerify(['staff']), staff.deleteStaff);

router.route('/login').post(staff.staffLogin);

module.exports = router;
