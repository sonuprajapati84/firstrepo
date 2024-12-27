const express = require('express');
const { addCnameRecord, updateCname} = require('../controllers/cnameController');

const router = express.Router();


router.post('/add-cname-record', addCnameRecord);
router.put('/update-cname', updateCname);

module.exports = router;
