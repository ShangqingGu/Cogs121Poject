
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('courses.db');
const firebase = require('firebase-admin');

var index = require('./routes/index');
var course = require('./routes/course');
var friend = require('./routes/friend');
var setting = require('./routes/setting');

let curr_user = '';


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
var config = {
    apiKey: "AIzaSyDiPDeKQgsRao9_0MKix0EOASCvHSgSRu8",
    authDomain: "cogs121-bc073.firebaseapp.com",
    databaseURL: "https://cogs121-bc073.firebaseio.com",
    projectId: "cogs121-bc073",
    storageBucket: "cogs121-bc073.appspot.com",
    messagingSenderId: "577082983656"
};
firebase.initializeApp(config);
const database = firebase.database();*/

app.get('/profile', index.view);
app.get('/', index.view);
app.get('/friend', friend.view);
app.get('/setting', setting.view);
app.get('/course', course.view);


app.get('/classes', (req, res) => {
  db.all('SELECT name FROM courses_info', (err, rows) => {
    console.log(rows);
    const allClasses = rows.map(e => e.name); // returns a list of object keys
    console.log('allClasses is:', allClasses);
    res.send(allClasses);
  });
});

app.get('/classes/:classid', (req, res) => {
  const classToLookup = req.params.classid; // matches ':classid' above
  db.all('SELECT * FROM courses_info WHERE name=$name',
  {$name: classToLookup}, (err, rows) => {
    console.log(classToLookup, '->', rows); // for debugging
    if (rows[0]) {
      res.send(rows[0]);
    } else {
      res.send({}); // failed, so return an empty object instead of undefined
    }
  });
});


//Add classes post -> line 47 in course.handlebars
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.post('/classes', (req, res) => {
  console.log(req.body);
  db.run('INSERT INTO courses_info VALUES($name, $prof, $time)',
   {
    $name: req.body.name,
    $prof: req.body.prof,
    $time: req.body.time,
   },
   (err) => {
     if (err) {
       res.send({message: 'error in app.post(/classes)'});
     } else {
       res.send({message: 'successfully run app.post(/classes)'});
     }
   });
 });

app.post('/login', (req, res) => {
   curr_user = req.body.user;
   console.log("current user is " + curr_user);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
