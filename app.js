const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const config = require('config');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGOLAB_URI || config.MONGOLAB_URI ;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log(mongoose.connection.readyState);

const indexRouter = require('./routes');


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/', indexRouter);

app.listen(PORT, function () {
    console.log('App is listening on port 5000!');
});
