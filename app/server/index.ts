import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';

const server = express();

server.use(cors());

server.use(express.json());
server.use(bodyParser.json());

export default server;
