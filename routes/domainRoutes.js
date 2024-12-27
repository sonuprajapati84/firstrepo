const express = require('express');
const { checkDomainAvailability, registerDomain, updateDns } = require('../controllers/domainController');

const router = express.Router();



router.post('/check-domain', checkDomainAvailability);
router.post('/register-domain', registerDomain);
router.put('/update-dns',updateDns)




module.exports = router;
