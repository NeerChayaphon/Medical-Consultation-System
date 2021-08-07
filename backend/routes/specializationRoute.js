const express = require('express');
const sp = require('../controllers/specialization');
const router = express.Router();

router.route('/').get(sp.getAllSp).post(sp.createSp); // chain route

router.route('/:id').get(sp.getSp).put(sp.updateSp).delete(sp.deleteSp);

module.exports = router;
