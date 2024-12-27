const express = require('express');
const { addRecord, updateRecord } = require('../controllers/aController');

const router = express.Router();
router.post('/add-address', addRecord);
router.put('/update-record', updateRecord);

module.exports = router;