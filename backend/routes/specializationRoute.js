/* specializationRoute.js use for the specialization route to handle to use with controller */

const express = require('express');
const sp = require('../controllers/specialization');
const router = express.Router();

router.route('/').get(sp.getAllSp).post(sp.createSp); // chain route get and create specialization

router.route('/:id').get(sp.getSp).put(sp.updateSp).delete(sp.deleteSp); // chain route update and delete specialization

module.exports = router;
