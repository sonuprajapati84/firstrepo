const express = require('express');
const dotenv = require('dotenv');
const domainRoutes = require('./routes/domainRoutes');
const cnameRoutes = require('./routes/cnameRoutes');
const aRoutes = require('./routes/aRoutes');
const mxRoutes = require('./routes/mxRoutes');
const txtRoutes = require('./routes/txtRoutes');

dotenv.config();
const app = express();
app.use(express.json());


app.use('/api/domains', domainRoutes);
app.use('/api/cnames', cnameRoutes );
app.use('/api/address', aRoutes);
app.use('/api/mx', mxRoutes);
app.use('/api/txt', txtRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
