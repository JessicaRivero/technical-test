require('dotenv').config();

const Server = require('./src/config/server')

const server = new Server();
server.listen();




