const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// IMPORT MODELS
require('./models/Product');

const app = express();

mongoose.Promise = global.Promise;
const uri = 'mongodb+srv://sonatakatt:sonatatuck@cluster0-jphyo.mongodb.net/test?retryWrites=true&w=majority'
//mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);
mongoose.connect(uri || `mongodb://localhost:27017/node-react-starter`);

app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/productRoute')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});