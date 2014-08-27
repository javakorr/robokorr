var express = require('express'),
    fs = require('fs'),
    pg = require('pg'),
    sendView = function(req, res, view) {
        var fileContents = fs.readFileSync('views/' + view + '.html');

        res.send(fileContents.toString());
    };

var app = express();

app.use(express.static(__dirname + '/public'));

var client = new pg.Client(process.env.DATABASE_URL);

client.connect();

app.get('/', function(req, res) {
    sendView(req, res, 'index');
});

app.get('/move', function(req, res) {
    client.query("UPDATE robokorr SET current_command = 'MVFRWRD'", function(err, results) {
        if (err) return console.error('Error running query', err);

        console.log(results);

        res.send(results);
        res.end();
    });
});

app.get('/stop', function(req, res) {
    client.query("UPDATE robokorr SET current_command = 'DNTHNG'", function(err, results) {
        if (err) return console.error('Error running query', err);

        console.log(results);

        res.send(results);
        res.end();
    });
});

app.get('/get_command', function(req, res) {
    client.query('SELECT * FROM robokorr', function(err, results) {
        if (err) return console.error('Error running query', err);

        res.send(results.rows[0].current_command);
        res.end();
    });
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log("Listening on " + port);
});