const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

//Use these files
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/schedule_email_task', { useNewUrlParser: true })
    .then(re => console.log('Connected to schedule_email_task DB...'))
    .catch(err => console.log(err));

app.use('/tasks', require('./controller/taskList-controller'));

app.get('/', function (req, res) {
    res.send('invalid rest point');
});

//Listen to port 9005
app.listen(9005, function () {
    console.log("Server Started @ 9005:-)");
});

module.exports = app;
