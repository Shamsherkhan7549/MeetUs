import express from 'express';
import {createServer} from 'node:http';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import 'dotenv/config';
import MESSAGEMODEL from './message.model.js';

async function main(){
    await mongoose.connect(process.env.MONGO_URI);
};
main().then(()=>console.log("db connected")).catch(err=> console.log("error in db: "+ err ));


const app = express();
const server = createServer(app);
const io = new Server(server,
    {
        connectionStateRecovery:{}
    }
); //new instance of socket.io
app.set("port", 8080);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname,'index.html'));
});

io.on('connection',(socket) => {
    console.log('a user connnected');

     socket.on('chat', async(msg) => {
        let result;
        try{
            result = new MESSAGEMODEL({
                content:msg
            });
            await result.save();

        }catch(err){
            return;
        }
        
        io.emit('chat', msg, result.lastID);
  });
  
  if(!socket.recovered){
    try{
          const serverOffset = socket.handshake.auth.serverOffset || null;

          const query = serverOffset
      ? { _id: { $gt: new Types.ObjectId(serverOffset) } }
      : {};

       const missedMessages =  Message.find(query).sort({ _id: 1 }).catch(err=> console.log(err));
         for (const msg of missedMessages) {
      socket.emit('chat message', msg.content, msg._id.toString());
    }

    }catch(err){
        console.error('Error fetching messages from MongoDB via Mongoose:', err);
        return
    }
  }

     socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})


server.listen(app.get("port"), () => {
    console.log('server running on port:8080')
});