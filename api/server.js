const express = require('express');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const server = express();

const sessionConfig = {
    name: "monkey",
    secret: "keep it secret keep it dark",
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hr ... min sec ms
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: require("../data/db-config"),
        tablename: "sessions",
        sidfieldname: "sid",
        createTable: true,
        clearInterval: 60 * 60 * 1000 // 1 hr
    })
};

server.use(express.json());
server.use(session(sessionConfig));
server.use('/api', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;