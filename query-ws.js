'use strict';

var util = require('util');
var waterfall = require('async-waterfall');
var hana = require('@sap/hana-client');

var connOptions = {
    serverNode: 'wsproxy.hana.prod.<datacenter>.whitney.dbaas.ondemand.com:80',
	webSocketURL: "/service/<hana-instance-guid>",
    uid: '<user>',
    pwd: '<password>'
};

var connection = hana.createConnection();

var tasks = [
	myconn,
    mysql1, myexecute, myresults,
    mysql2, myexecute, myresults,
    mydisco
	];

waterfall(tasks, done);
console.log("Async calls underway\n");

function myconn(cb) {
    connection.connect(connOptions);
    cb(null);
}

function mysql1(cb) {
    var sql = 'select SESSION_USER, CURRENT_SCHEMA from DUMMY';
    cb(null, sql);
}

function mysql2(cb) {
	var sql = 'select SYSTEM_ID, DATABASE_NAME, HOST, VERSION, USAGE from M_DATABASE';
    cb(null, sql);
}

function myexecute(sql, cb) {
    var rows = connection.exec(sql);
    cb(null, rows);
}

function myresults(rows, cb) {
    console.log(util.inspect(rows, { colors: true }));
    console.log("");
    cb(null);
}

function mydisco(cb) {
    connection.disconnect(cb);
}

function done(err) {
    console.log("Async done");
    if (err) {
        return console.error(err);
    }
}
