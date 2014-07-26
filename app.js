var express = require('express'),
    fs = require('fs'),
    sendView = function(req, res, view) {
        var fileContents = fs.readFileSync('views/' + view + '.html');

        res.send(fileContents.toString());
    };

var app = express();

var COMMAND = 'DNTHNG';

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    sendView(req, res, 'index');
});

app.get('/move', function(req, res) {
    COMMAND = 'MV';
    res.send(200);
    res.end();
});

app.get('/stop', function(req, res) {
    COMMAND = 'STP';
    res.send(200);
    res.end();
});

app.get('/get_command', function(req, res) {
    res.send(COMMAND);
    res.end();
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Listening on " + port);
});