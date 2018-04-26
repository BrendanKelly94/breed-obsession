require('dotenv').config();

const express = require('express');
const http = require('http');
const path = require('path');
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.API_TOKEN })
const environment = process.env.NODE_ENV || 'development';
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
console.log(process.env.PET_FINDER_KEY, process.env.WORLD_CITIES_KEY);
//GET CONFIG VAR FROM SPECIFIC HEROKU APP

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.get('/keys', (req, res) => {
  res.json({"petKey": process.env.PET_FINDER_KEY, "cityKey": process.env.WORLD_CITIES_KEY});
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));
