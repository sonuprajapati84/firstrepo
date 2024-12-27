const axios = require('axios');

exports.addRecord = async ({ domainName, addressValue, host, ttl }) => {
  try {
    const response = await axios.post(
      'https://test.httpapi.com/api/dns/manage/add-ipv4-record.json', 
      null, 
      {
        params: {
          'auth-userid': process.env.AUTH_USERID,
          'api-key': process.env.RESELLER_API_KEY,
          'domain-name': domainName,
          'value': addressValue,
          'host': host,
          'ttl': ttl,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error adding address record: ' + error.message);
  }
};

exports.updateRecord = async ({ domainName, host, currentValue, newValue, ttl }) => {
  try {
    const response = await axios.post(
      'https://test.httpapi.com/api/dns/manage/update-ipv4-record.json', 
      null, 
      {
        params: {
          'auth-userid': process.env.AUTH_USERID,
          'api-key': process.env.RESELLER_API_KEY,
          'domain-name': domainName,
          'dns-type': 'A',
          'host': host,
          'current-value': currentValue,
          'new-value': newValue,
          'ttl': ttl,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error updating Address record: ' + error.message);
  }
};