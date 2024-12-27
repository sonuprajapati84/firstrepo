const express = require('express');

const domainRoutes = require('./domainRoutes');
const cnameRoutes = require('./cnameRoutes');
const aRoutes = require('./aRoutes');
const mxRoutes = require('./mxRoutes');
const txtRoutes = require('./txtRoutes');

const router = express.Router();


router.use('/api/domains', domainRoutes);
router.use('/api/cnames', cnameRoutes);
router.use('/api/address', aRoutes);
router.use('/api/mx', mxRoutes);
router.use('/api/txt', txtRoutes);

module.exports = router;
