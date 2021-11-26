import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import firebaseAdmin from 'firebase-admin';

const router = express();

// Server Handling
const httpServer = http.createServer(router);

// firebase admin

let serviceAccountKey = require('./config/serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountKey)
});

// connect to mongo db
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(() => {
        logging.info('Mongo connected');
    })
    .catch((error) => {
        logging.error(error);
    });

// logging middleware
router.use((req, res, next) => {
    logging.info(`METHOD: '${req.method}'- URL: '${req.url}' -IP: '${req.socket.remoteAddress}' `);

    res.on('finish', () => {
        logging.info(`METHOD: '${req.method}'- URL: '${req.url}' -IP: '${req.socket.remoteAddress}' -STATUS: '${res.statusCode}' `);
    });
    // 'next' allows request to continue to next piece of middleware
    next();
});

// parse body
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//api access policies where we are allowed to make requests from
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// routes

// error handling
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

// listen for requests
httpServer.listen(config.server.port, () => {
    logging.info(`🦗The Server is running at ${config.server.host}:${config.server.port} ... `);
});
