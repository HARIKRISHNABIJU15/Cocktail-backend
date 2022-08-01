var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var assert= require('assert');
const mongoose = require('mongoose');
const { Db } = require('mongodb');



var app = express();
//mongodb connection code
mongoose.connect('mongodb+srv://XdithyX:adhi%404136@thecocktail.hzdrmoi.mongodb.net/admin-logins',{
  useUnifiedTopology : true,
  useNewUrlParser : true
}).then(console.log("connected to mongo db"))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cors())
app.post('/admin/validate', (req,res)=>{
  console.log(req.body);
  console.log("hello");
  var user ={
    username: req.body.username,
    password: req.body.password
  }
  console.log({user})
  try{
  db.adminlogins.insertOne({user});
  }catch(e){
    console.log(e);
  }
  res.send(`hello ${user}`);
  

});

app.get('/get-adminlogins', (req,res)=>{


});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
