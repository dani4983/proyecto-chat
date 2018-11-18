const http = require ('http');
const path = require ('path');

const express = require ('express');
const socketio = require ('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);
//setting
app.set('port', process.env.PORT || 3333);
require('./sockets')(io);



//enviando archivo estaticos
app.use(express.static(path.join(__dirname, 'public')));
//aca esta escuchando al servidor
server.listen(app.get('port'), () => {
   console.log('servidor en puerto 3333', app.get('port'));
});
