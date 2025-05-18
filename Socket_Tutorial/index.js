import express from 'express';
import {createServer} from 'node:http'
import {fileURLToPath} from 'node:url'
import {dirname,join} from 'node:path'
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server); //new instance of socket.io
app.set("port", 8080);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname,'index.html'));
});

io.on('connection',(socket) => {
    console.log('a user connnected');

     socket.on('chat', (msg) => {
        io.emit('chat', msg)
  });

     socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})


server.listen(app.get("port"), () => {
    console.log('server running on port:8080')
});