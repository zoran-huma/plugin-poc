// server/index.js
const express = require('express');
const path = require('path');
const PORT = 8200;
const app = express();
const fs = require('fs');
const cors = require('cors');
var bodyParser = require('body-parser');

let plugins = require('./plugins.json');

const updateFile = () => {
  fs.writeFileSync(__dirname + '/plugins.json', JSON.stringify(plugins));
};

app.use(
  express.static(path.resolve(__dirname, 'build'), {
    maxAge: '365d',
  })
);
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Nothing here');
});

app.get('/plugins', (req, res) => {
  res.send(JSON.stringify(plugins));
});

app.put('/plugins', (req, res) => {
  const { id } = req.body;
  const pluginIndex = plugins.findIndex((plugin) => plugin.id == id);
  plugins[pluginIndex].enabled = !plugins[pluginIndex].enabled;

  updateFile();
  res.send(JSON.stringify(plugins[pluginIndex]));
});

app.listen(PORT);

console.log(`Listening on: http://localhost:${PORT}`);
