const cnameService = require('../services/cnameService');


exports.addCnameRecord = async (req, res) => {
    const { domainName, cnameValue, cnameHost, ttl } = req.body;
    if (!domainName || !cnameValue || !cnameHost || !ttl) {
        return res.status(400).json({
            message: 'All Fields are required { domainName, cnameValue, cnameHost, ttl }',
        });
    }
    try {
        const response = await cnameService.addCnameRecord({ domainName, cnameValue, cnameHost, ttl });
        if (response.status === 'Success') {
            return res.status(200).json({
                message: 'CNAME record added successfully.',
                details: response,
            });
        } else {
            return res.status(400).json({
                message: 'Failed to add CNAME record.',
                details: response,
            });
        }
    } catch (error) {
        console.error('Error adding CNAME record:', error.response?.data || error.message);
        return res.status(500).json({
            message: 'Error adding CNAME record',
            error: error.response?.data?.message || error.message,
        });
    }
};

exports.updateCname = async (req, res) => {
    const { domainName, cnameHost, currentValue, newValue, ttl } = req.body;
    if (!domainName || !currentValue || !newValue) {
        return res.status(400).send({ message: 'Domain name, current value, and new value are required.' });
    }
    try {
        const response = await cnameService.updateCnameRecord({ domainName, cnameHost, currentValue, newValue, ttl });
        if (response.status === 'Success' && response.msg === 'Record details have been modified successfully.') {
            return res.status(200).send({
                message: 'CNAME record updated successfully',
                details: response,
            });
        } else {
            return res.status(400).send({
                message: 'Failed to update CNAME record',
                details: response,
            });
        }
    } catch (error) {
        console.error('Error updating CNAME record:', error.response?.data || error.message);
        return res.status(500).send({
            message: 'Error updating CNAME record',
            error: error.response?.data?.message || error.message,
        });
    }
};
