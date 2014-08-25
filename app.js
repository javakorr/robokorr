var express = require('express'),
    fs = require('fs'),
    pg = require('pg'),
    sendView = function(req, res, view) {
        var fileContents = fs.readFileSync('views/' + view + '.html');

        res.send(fileContents.toString());
    };

var app = express();

var COMMAND = 'DNTHNG';

app.use(express.static(__dirname + '/public'));

app.use(orm.express('postgres://uollbbgzkndlbm:TT_5A4FwOU9kJh6w42eymriU6m@ec2-54-197-250-40.compute-1.amazonaws.com:5432/d4nun3pf3d572i', {
    define: function(db, models) {
        models.current_command_model = current_command_model.load(db);
    }
}));

app.get('/', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        var query = client.query('SELECT * FROM robokorr');

        query.on('row', function(row) {
            console.log(JSON.stringify(row));
        });
    });

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