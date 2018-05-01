const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('courses.db');

db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE courses_info (name TEXT, prof TEXT, time TEXT)");

  // insert 3 rows of data:
  db.run("INSERT INTO courses_info VALUES ('COGS120', 'Prof. Scott Klemmer', '9:00am - 10:50am')");
  db.run("INSERT INTO courses_info VALUES ('COGS17', 'Dr. Johnson', '3:30pm - 4:50pm')");
  db.run("INSERT INTO courses_info VALUES ('COGS121', 'Prof. Phillip Guo', '2:00pm - 2:50pm')");

  console.log('successfully created the courses_info table in courses.db');

  // print them out to confirm their contents:
  db.each("SELECT name, prof, time FROM courses_info", (err, row) => {
      console.log(row.name + ": " + row.prof + ' , ' + row.time);
  });
});


db.close();
