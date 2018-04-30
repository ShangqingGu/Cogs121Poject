
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var course = require('./routes/course');
var friend = require('./routes/friend');
var setting = require('./routes/setting');

var app = express();

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

app.get('/', index.view);
app.get('/course', course.view);
app.get('/friend', friend.view);
app.get('/setting', setting.view);

//milestone3 fake database and get classes
const fakeDatabase = {
  'COGS120': {prof:'Prof. Scott Klemmer', time:'9:00am - 10:50am'},
  'COGS17': {prof:'Dr. Johnson', time:'3:30pm - 4:50pm'},
  'COGS121': {prof:'Prof. Phillip Guo',time: '2:00pm - 2:50pm'}
};

app.get('/classes', (req, res) => {
  const allClasses = Object.keys(fakeDatabase); // returns a list of object keys
  console.log('allClasses is:', allClasses);
  res.send(allClasses);
});

app.get('/classes/:classid', (req, res) => {
  const classToLookup = req.params.classid; // matches ':classid' above
  const val = fakeDatabase[classToLookup];
  console.log(classToLookup, '->', val); // for debugging
  if (val) {
    res.send(val);
  } else {
    res.send({}); // failed, so return an empty object instead of undefined
  }
});

//Add classes post -> line 47 in course.handlebars
app.post('/classes', (req, res) => {

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


