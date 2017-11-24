var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var parse = require('color-parse');
app.use(express.static(__dirname + '/node_modules'));

io.on('connection', function (socket) {
    console.log('Client connected...');

    socket.on('join', function (data) {
        console.log(data);
    });

    socket.on('rgb-push', (message) => {
        let colour = parse(message);
        if (!colour.values.length) {
            io.emit('rgb-error', { type: 'rgb-error', text: `Could not parse ${message}` });
        } else {
            io.emit('rgb-pull', { type: 'rgb-pull', text: colour.values });
            console.log(colour.values);
        }

    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

server.listen(8080);