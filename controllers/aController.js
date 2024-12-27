const aService = require('../services/aService');


exports.addRecord = async (req, res) => {
    const { domainName, addressValue, host, ttl } = req.body;
    if (!domainName || !addressValue || !host || !ttl) {
        return res.status(400).json({
            message: 'All Fields are required { domainName, addressValue, host, ttl }',
        });
    }
    try {
        const response = await aService.addRecord({ domainName, addressValue, host, ttl });
        if (response.status === 'Success') {
            return res.status(200).json({
                message: 'address record added successfully.',
                details: response,
            });
        } else {
            return res.status(400).json({
                message: 'Failed to add address record.',
                details: response,
            });
        }
    } catch (error) {
        console.error('Error adding address record:', error.response?.data || error.message);
        return res.status(500).json({
            message: 'Error adding address record',
            error: error.response?.data?.message || error.message,
        });
    }
};

exports.updateRecord = async (req, res) => {
    const { domainName, host, currentValue, newValue, ttl } = req.body;
    if (!domainName || !currentValue || !newValue) {
        return res.status(400).send({ message: 'Domain name, current value, and new value are required.' });
    }
    try {
        const response = await aService.updateRecord({ domainName, host, currentValue, newValue, ttl });
        if (response.status === 'Success' && response.msg === 'Record details have been modified successfully.') {
            return res.status(200).send({
                message: 'Address record updated successfully',
                details: response,
            });
        } else {
            return res.status(400).send({
                message: 'Failed to update Address record',
                details: response,
            });
        }
    } catch (error) {
        console.error('Error updating address record:', error.response?.data || error.message);
        return res.status(500).send({
            message: 'Error updating address record',
            error: error.response?.data?.message || error.message,
        });
    }
};
