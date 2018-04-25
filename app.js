require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

const express = require('express');
const http = require('http');
const path = require('path');
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.API_TOKEN })
const environment = process.env.NODE_ENV || 'development';
const app = express();

let PET_KEY = '';
let CITY_KEY = '';

app.use(express.static(path.join(__dirname, 'dist')));

//GET CONFIG VAR FROM SPECIFIC HEROKU APP
heroku.request({
  method: 'GET',
  path: 'https://api.heroku.com/apps/breed-obsession/config-vars',
  headers: {
    "Accept": "application/vnd.heroku+json; version=3",
    "Authorization": "Bearer "+process.env.API_TOKEN
  },
  parseJSON: true
}).then(response => {
  console.log(response.API_KEY, "heroku api from server");
  PET_KEY = response.PET_FINDER_KEY;
  CITY_KEY = response.WORLD_CITIES_KEY;
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.get('/keys', (req, res) => {
  res.json({petKey: PET_KEY, cityKey: CITY_KEY});
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));
