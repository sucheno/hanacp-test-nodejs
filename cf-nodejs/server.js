const express = require('express');
const app = express();

var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();
var hanaCredentials = appEnv.getServiceCreds('hana-schema');

var hdbext = require("@sap/hdbext");

app.use(
	hdbext.middleware(hanaCredentials)
);

app.get('/', function (req, res) {
	res.type("text/html").status(200).send('<html><head></head><body><a href="/database">Database</a><br/><a href="/session">Session</a><br/><a href="/create">Create</a><br/><a href="/insert">Insert</a><br/><a href="/select">Select</a><br/><a href="/drop">Drop</a></body></html>');
});

app.get('/database', function (req, res) {
	req.db.exec('select SYSTEM_ID, DATABASE_NAME, HOST, VERSION, USAGE from M_DATABASE', function(err, results) {
		if (err) {
			res.type("text/plain").status(500).send("ERROR: " + err.toString());
			return;
		}
		res.status(200).json(results);
	});
});

app.get('/session', function (req, res) {
	req.db.exec('select SESSION_USER, CURRENT_SCHEMA from DUMMY', function(err, results) {
		if (err) {
			res.type("text/plain").status(500).send("ERROR: " + err.toString());
			return;
		}
		res.status(200).json(results);
	});
});

app.get('/create', function (req, res) {
	req.db.exec('create table MYTABLE (MYVALUE double)', function(err, results) {
		if (err) {
			res.type("text/plain").status(500).send("ERROR: " + err.toString());
			return;
		}
		res.status(200).json(results);
	});
});

app.get('/insert', function (req, res) {
	req.db.exec('insert into MYTABLE values (RAND())', function(err, results) {
		if (err) {
			res.type("text/plain").status(500).send("ERROR: " + err.toString());
			return;
		}
		res.status(200).json(results);
	});
});

app.get('/select', function (req, res) {
	req.db.exec('select MYVALUE from MYTABLE', function(err, results) {
		if (err) {
			res.type("text/plain").status(500).send("ERROR: " + err.toString());
			return;
		}
		res.status(200).json(results);
	});
});

app.get('/drop', function (req, res) {
	req.db.exec('drop table MYTABLE', function(err, results) {
		if (err) {
			res.type("text/plain").status(500).send("ERROR: " + err.toString());
			return;
		}
		res.status(200).json(results);
	});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.info("Listening on port: " + port);
});
