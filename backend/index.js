import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import {createServer} from "node:http";

import {connectToSocket} from './controllers/socketManager.js';

import cors from 'cors';
import userRouter from './routes/user.router.js';

const app = express();

const server = createServer(app);
const io = connectToSocket(server);

const url = process.env.MONGO_URI;

async function main(){
    await mongoose.connect(`${url}\MeetUs`);
}

main().then(res=>console.log("DB Connected")).catch(err=>console.log(err));

app.set("port", (process.env.PORT || 4000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.get('/', (req, res) => {
    res.send("<h2>it's a root page</h2>")
});

app.use('/user', userRouter);



server.listen(app.get("port"), () => {
    console.log(`server running on port ` + app.get("port"));
})