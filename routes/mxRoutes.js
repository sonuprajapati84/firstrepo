const express = require('express');
const { addMxRecord, updateMxRecord } = require('../controllers/mxController');

const router = express.Router();
router.post('/add-mx-record', addMxRecord);
router.put('/update-mx-record', updateMxRecord);


module.exports = router;