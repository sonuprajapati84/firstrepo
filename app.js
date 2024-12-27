const express = require('express');
const dotenv = require('dotenv');
const routesManager = require('./routes/index');

dotenv.config();
const app = express();
app.use(express.json());


app.use(routesManager);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
