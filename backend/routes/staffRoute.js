/* staffRoute.js use for the staff route to handle to use with controller */

const express = require('express');
const staff = require('../controllers/staff');
const router = express.Router();
const jwt = require('../helpers/jwt');

// path = "/"
router
  .route('/')
  .get(jwt.userVerify(['staff']), staff.getAllStaff) // get all staffs
  .post(jwt.userVerify(['staff']), staff.createStaff); // create staff

  // path = "/:id"
router
  .route('/:id')
  .get(jwt.userVerify(['staff']), staff.getStaff) // get staff by id
  .put(jwt.userVerify(['staff']), staff.updateStaff) // update staff by id 
  .delete(jwt.userVerify(['staff']), staff.deleteStaff); // delete staff by id

router.route('/login').post(staff.staffLogin); // staff login

module.exports = router;
