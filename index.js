const http = require('http');

const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//configuracion
app.set('port', process.env.PORT || 3693);


require('./public/sockets')(io);

//enviando archivos estaticos
app.use(express.static('public'));

//escuchando servidor
server.listen(app.get('port'), () => {
   console.log('servidor en puerto', app.get('port'));
});
