const mxService = require('../services/mxService');


exports.addMxRecord = async (req, res) => {
    const { domainName, mxValue, host, ttl } = req.body;
    if (!domainName || !mxValue || !host || !ttl) {
        return res.status(400).json({
            message: 'All Fields are required { domainName, mxValue, host, ttl }',
        });
    }
    try {
        const response = await mxService.addMxRecord({ domainName, mxValue, host, ttl });
        if (response.status === 'Success') {
            return res.status(200).json({
                message: 'MX record add successfully.',
                details: response,
            });
        } else {
            return res.status(400).json({
                message: 'Failed to add MX record.',
                details: response,
            });
        }
    } catch (error) {
        console.error('Error adding MX record:', error.response?.data || error.message);
        return res.status(500).json({
            message: 'Error adding MX record',
            error: error.response?.data?.message || error.message,
        });
    }
};



exports.updateMxRecord = async (req, res) => {
    const { domainName, host, currentValue, newValue, ttl } = req.body;
    if (!domainName || !currentValue || !newValue) {
        return res.status(400).send({ message: 'Domain name, current value, and new value are required.' });
    }
    try {
        const response = await mxService.updateMxRecord({ domainName, host, currentValue, newValue, ttl });
        if (response.status === 'Success' && response.msg === 'Record details have been modified successfully.') {
            return res.status(200).send({
                message: 'MX record updated successfully',
                details: response,
            });
        } else {
            return res.status(400).send({
                message: 'Failed to update MX record',
                details: response,
            });
        }
    } catch (error) {
        console.error('Error updating MX record:', error.response?.data || error.message);
        return res.status(500).send({
            message: 'Error updating MX record',
            error: error.response?.data?.message || error.message,
        });
    }
};