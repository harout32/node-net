const net = require('net');

process.stdout.write('\u001B[2J\u001B[0;0f');
const server = net.createServer();
let counter = 0;
let sockets = {};
server.on('connection', socket => {
    socket.id = counter++;
    sockets[socket.id] = socket;
    console.log('Client connected');
    socket.write('Welcome new Client \n');
    socket.on('data', data => {
        socket.write(`${socket.id} : `);
        socket.write(data+ '\n');
    })
    socket.setEncoding('utf8');
    socket.on('end', () => {
        console.log('Client Desconnected');
    })
});
server.listen(8000, () => console.log('sevrer is listening on port => 8000'));