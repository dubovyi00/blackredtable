var express = require('express');
var fs = require('fs');
var app = express();
var crypto = require('crypto');
var server = app.listen(8888);
var bodyParser = require('body-parser')
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

function getHash(text) {
    return crypto.createHash('sha384').update(text + config.salt).digest('hex');
}

function sendSuccess(res, success) {
    res.send({ "data": success, "error": null })
}

function sendError(res, error) {
    res.send({ "data": null, "error": error })
}

//вход
app.post('/auth', async function (req, res) {
    if (req.body.login == null || req.body.password == null) {
        sendError(res, "400")
        return
    }

    var conn = await pool.getConnection()
    try {
        rows = await conn.query("SELECT * from admin WHERE login = ? AND password = ?;", [req.body.login, getHash(req.body.password)])

        if (rows.length == 0) {
            sendError(res, "401")
            return
        }

        sendSuccess(res, "Hello dear " + req.body.login)
    } catch (error) {
        console.log("error", error)
        sendError(res, error)
    }
    conn.end()
})

//регистрация
app.post('/register', async function (req, res) {
    if (req.body.login == null || req.body.password == null) {
        sendError(res, "400")
        return
    }

    var conn = await pool.getConnection()
    try {
        rows = await conn.query("SELECT * from admin WHERE login = ?;", [req.body.login])

        if (rows.length > 0) {
            sendError(res, "409")
            return
        }
        
        rows = await conn.query("INSERT INTO admin (login, password) VALUES (?, ?);", [req.body.login, getHash(req.body.password)])

        sendSuccess(res, "Welcome dear " + req.body.login)
    } catch (error) {
        console.log("error", error)
        sendError(res, error.code)
    }
    conn.end()
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