var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var connectionString = 'mongodb://127.0.0.1:27017/webdev2016f';
var assignment = require('./assignment/app.js');
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/project'));
app.use(cookieParser());
app.use(session({
    secret: "zz",
}));
app.use(passport.initialize());
app.use(passport.session());
assignment(app);



//
// require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
