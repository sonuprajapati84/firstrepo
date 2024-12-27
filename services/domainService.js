// services/domainService.js
const axios = require('axios');

exports.checkAvailability = async (domainName, tlds) => {
  const availability = {};
  for (const tld of tlds) {
    const fullDomain = `${domainName}.${tld}`;
    const response = await axios.get('https://test.httpapi.com/api/domains/available.json', {
      params: {
        'auth-userid': process.env.AUTH_USERID,
        'api-key': process.env.RESELLER_API_KEY,
        'domain-name': domainName,
        'tlds': tld,
      },
    });
    availability[fullDomain] = response.data[fullDomain]?.status === 'available' ? 'available' : 'not available';
  }
  return availability;
};



exports.registerDomain = async ({
  domainName,
  years,
}) => {
  const response = await axios.get('https://test.httpapi.com/api/domains/register.json?'+process.env.NS, {
    params: {
      'auth-userid': process.env.AUTH_USERID,
      'api-key': process.env.RESELLER_API_KEY,
      'domain-name': domainName,
      'customer-id': process.env.CUSTOMER-ID,
      'years': 1,
      'invoice-option': 'NoInvoice',
      'reg-contact-id': process.env.REGISTER_CONTACT_ID,
      'admin-contact-id': process.env.ADMIN_CONTACT_ID,
      'tech-contact-id': process.env.TECHNICAL_CONTACT_ID,
      'billing-contact-id': process.env.BILLING_CONTACT_ID,
    },
  });
  return response.data;
};



exports.updateDns = async ({ domainName, orderId }) => {
  try {
    const response = await axios.get('https://test.httpapi.com/api/domains/modify-ns.json?'+ process.env.NS, {
      params: {
        'auth-userid': process.env.AUTH_USERID,
        'api-key': process.env.RESELLER_API_KEY,
        'domain-name': domainName,
        'order-id': orderId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Error updating DNS');
  }
};
  