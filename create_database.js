const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('courses.db');

db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE courses_info (name TEXT, prof TEXT, time TEXT)");

  // insert 3 rows of data:
  db.run("INSERT INTO courses_info VALUES ('COGS1', 'De Sa, Virginia', '9:30a-10:50a')");
  db.run("INSERT INTO courses_info VALUES ('COGS3', 'Boyle, Mary E. T.', '8:00a-9:20a')");
  db.run("INSERT INTO courses_info VALUES ('COGS9', 'Voytek, Bradley Thomas', '2:00p-3:20p')");
  db.run("INSERT INTO courses_info VALUES ('COGS10', 'Scott, Taylor Jackson', '3:30p-4:50p')");
  db.run("INSERT INTO courses_info VALUES ('COGS11', 'Boyle, Mary E. T.', '12:30p-1:50p')");
  db.run("INSERT INTO courses_info VALUES ('COGS15', 'Bergen, Benjamin', '10:00a-10:50a')");
  db.run("INSERT INTO courses_info VALUES ('COGS17', 'Johnson, Christine M.', '2:00p-3:20p')");
  db.run("INSERT INTO courses_info VALUES ('COGS18', 'Staff', '9:00a-9:50a')");
  db.run("INSERT INTO courses_info VALUES ('COGS100', 'Kirsh, David Joel', '3:30p-4:50p')");

  console.log('successfully created the courses_info table in courses.db');

  // print them out to confirm their contents:
  db.each("SELECT name, prof, time FROM courses_info", (err, row) => {
      console.log(row.name + ": " + row.prof + ' , ' + row.time);
  });
});


db.close();
