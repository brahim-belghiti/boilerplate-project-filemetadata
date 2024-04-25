var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
const appRoutes = require('./src/routes/routes');

// mongo 
const DATA_BASE_URI = process.env;
const mongoose = require('mongoose');
mongoose.connect(DATA_BASE_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Database connection successful');
})
  .catch((err) => {
    console.error('Database connection error');
  });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// routes
app.use('/api', appRoutes);


const port = process.env.PORT || 8001;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
