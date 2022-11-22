var express = require('express');
var socket = require('socket.io');
var fs = require('fs');
var util = require('util');
var app = express();
var server = app.listen(8888);
const { send } = require('process');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json({ limit: '10mb' })
const mariadb = require('mariadb');
var config = JSON.parse(fs.readFileSync('config.json'));

const pool = mariadb.createPool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    connectionLimit: 5
});

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//вход
app.post('/auth', function (req, res) {
    console.log("auth", req.body)

    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * from admin")
                .then((rows) => {
                    console.log(rows); //[ {val: 1}, meta: ... ]
                    //Table must have been created before 
                    // " CREATE TABLE myTable (id int, val varchar(255)) "
                    //return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
                })
                .then((res) => {
                    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                    conn.end();
                })
                .catch(err => {
                    //handle error
                    console.log(err);
                    conn.end();
                })

        }).catch(err => {
            //not connected
        });

    // req.body.login req.body.pass
    res.send("hi, " + req.body.login)
})

//регистрация
app.post('/register', function (req, res) {
    console.log("register", req.body)
    // req.body.login req.body.pass
    res.send("okay, " + req.body.login)
})

//сохранение результата
app.post('/submit', function (req, res) {
    console.log("submit", req.body)
    // req.body.login req.body.result
    res.send("submit, " + req.body.login)
})

//получение рейтинга
app.get('/scores', function (req, res) {
    console.log("scores", req.body)
    // res.body.login res.body.result res.body.timestamp
    res.send("submit, " + res.body.login)
})

//получение рейтинга
app.get('/scores_xls', function (req, res) {
    console.log("scores_xls", req.body)
    // res.body.login res.body.result res.body.timestamp
    res.send("submit, " + res.body.login)
})