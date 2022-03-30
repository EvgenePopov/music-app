const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const config = require('./config');
const artists = require('./routers/artists');
const albums = require('./routers/albums');
const tracks = require('./routers/tracks');
const users = require('./routers/users');
const tHistory = require('./routers/trackhistory');

const port = 8000;

const whiteList = ['http://localhost:4200', 'https://localhost:4200'];

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || whiteList.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

app.use(cors({corsOptions}));
app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artists);
app.use('/albums', albums);
app.use('/tracks', tracks);
app.use('/users', users);
app.use('/track_history', tHistory);


const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));