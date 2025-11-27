const databaseConnection = require('./db/databaseConnection');

require('./socket/socket_io');

console.log('Socket.IO client started...');


databaseConnection()