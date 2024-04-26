var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
const fileRoutes = require('./src/routes/routes');

// database 
const mongoose = require('mongoose');
const DATABASE_URI = process.env.MONGO_URI;
mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
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
app.use('/api', fileRoutes);


const port = process.env.PORT || 8001;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
