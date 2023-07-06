import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import express from 'express';
import {usersRouter} from './routers/index.js';
import connect from './database/database.js';
import checkToken from './authentication/auth.js';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
const port =  process.env.PORT ?? 3000;

app.use(checkToken);
app.use('/users', usersRouter);

app.get('/', (req, res) =>{
    res.send("Lmaodd");
})

app.listen(port, async() =>{
    await connect();
    console.log(`listening on port ${port}`);
});

