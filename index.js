const databaseConnection = require('./db/databaseConnection');
const updateRdpInfoHandler = require('./handler/handleRdp/updateRdpInfo');


require('./socket/socket_io');

console.log('Socket.IO client started...');


databaseConnection()

updateRdpInfoHandler()