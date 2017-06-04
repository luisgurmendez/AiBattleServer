var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session')




var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


//Setup mongodb
var mongodb = require('mongodb');
var mongoServer = new mongodb.Server("127.0.0.1", 27017);
var Db = new mongodb.Db("aibattle", mongoServer)


Db.open(function (err, client) {
    if (err) throw err;
    console.log("\033[96m  + \033[39m connected to mongodb");
    app.users = client.collection("users");

});

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:"secret",
    resave: true,
    saveUninitialized: true}))

app.disable('etag');



// Checks session. If not authenticated, redirect to /login
app.all('*',function(req,res,next){

    if(req.url === '/login' || req.url === '/signup' || req.url === '/email'){
        return next()
    }else{
        if(req.session.loggedIn){
            console.log(req.session.loggedIn);

            var user = app.users.findOne({_id: mongodb.ObjectID(req.session.loggedIn)},function(err,doc){
                if(err) return next(err);
                if(!doc){
                    res.statusCode="401";
                    res.redirect('/login');
                }else{
                    next();
                }
            })
        }else{
            res.redirect('/login');
        }
    }
});


app.use('/', index);
app.use('/users', users);


app.get('/login',function(req,res){
  //res.sendFile(path.join(__dirname+'/views/login.html'));
    if(req.session.loggedIn){
        res.redirect('/');
    }else{
        res.render('login');
    }
})


app.post('/signup',function(req,res,next){
  var user={}
  user.fullname=req.body.fullname;
  user.username=req.body.username;
  user.email=req.body.email;
  user.address=req.body.address;
  user.city = req.body.city;
  user.password = req.body.password;

  app.users.insertOne(user, function (err, doc) {
      if (err) return next(err);
      res.redirect('/login');
  });

})


app.post('/email',function(req,res,next){

    console.log("Send email verification to: " + req.body.email)
    res.send(JSON.stringify({redirect:"http://localhost:3000/login"}))


})



app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


app.post('/login',function(req,res,next){

    var user = app.users.findOne({username:req.body.username,password:req.body.password},function(err,doc){
      if(err) return next(err)
        if (!doc || doc == null){
            // Ajax call, if status code != 200, success callback is not called in the client side.
            //res.statusCode="401";
            //res.end()
            res.send(JSON.stringify({authenticate:false}))
        }else{
            req.session.loggedIn = doc._id.toString();
            //res.statusCode="302";
            //console.log("redirecting..")
            res.send(JSON.stringify({authenticate:true, redirect:"http://localhost:3000/"}));
        }
    });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
