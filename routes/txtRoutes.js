const express = require('express');
const { addTxtRecord, updateTxtRecord } = require('../controllers/txtController');

const router = express.Router();

router.post('/add-txt-record', addTxtRecord);
router.put('/update-txt-record', updateTxtRecord);

module.exports = router;