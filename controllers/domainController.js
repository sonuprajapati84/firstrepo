const domainService = require('../services/domainService');



exports.checkDomainAvailability = async (req, res) => {
  const { domainName, tlds } = req.body;
  if (!domainName || !tlds) {
    return res.status(400).send({ message: 'Domain name and TLDs are required.' });
  }
  if (!Array.isArray(tlds) || tlds.length === 0) {
    return res.status(400).send({ message: 'At least one TLD must be selected.' });
  }
  try {
    const availability = await domainService.checkAvailability(domainName, tlds);
    res.status(200).send({
      message: 'Domain availability checked.',
      availability,
    });
  } catch (error) {
    console.error('Error checking domain:', error.message);
    res.status(500).send({
      message: 'Error checking domain availability',
      error: error.message,
    });
  }
};

exports.registerDomain = async (req, res) => {
  const { domainName, customerId, years, ns1, ns2, regContactId, adminContactId, techContactId, billingContactId } = req.body;
  if (!domainName || !customerId || !years || !regContactId || !adminContactId || !techContactId || !billingContactId) {
    return res.status(400).send({ message: 'All fields are required.' });
  }
  try {
    const response = await domainService.registerDomain({ domainName,
      customerId,
      years,
      ns1,
      ns2,
      regContactId,
      adminContactId,
      techContactId,
      billingContactId,
    });

    if (response.actionstatusdesc === 'Success') {
      const newDomain = new Domain({
        domainName,
        registrationStatus: 'registered',
        registrationDate: new Date(),
      });

      await newDomain.save();

      res.status(201).send({
        message: 'Domain registered successfully',
        domain: newDomain,
      });
    } else {
      res.status(400).send({
        message: 'Failed to register domain',
        details: response,
      });
    }
  } catch (error) {
    console.error('Error registering domain:', error.message);
    res.status(500).send({
      message: 'Error registering domain',
      error: error.message,
    });
  }
};

exports.updateDns = async (req, res) => {
  const { domainName, orderId } = req.body;
  if (!domainName || !orderId) {
    return res.status(400).send({ message: 'Both domainName and orderId are required.' });
  }
  try {
    const response = await domainService.updateDns({ domainName, orderId });
    if (response?.actionstatusdesc === 'Success') {
      res.status(200).send({
        message: 'DNS updated successfully',
        details: response,
      });
    } else {
      res.status(400).send({
        message: 'Failed to update DNS',
        details: response,
      });
    }
  } catch (error) {
    console.error('Error updating DNS:', error.message);
    res.status(500).send({
      message: 'Error updating DNS',
      error: error.message,
    });
  }
};
