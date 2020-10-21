const logger = require('./src/server/utils/logger');
logger.log('************ STARTING Express Application(server.js)**************');

const http = require("http");
const app = require("./src/server/app");

// port mormalization section
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// getting the port on which server needs to be started
const port = normalizePort(process.env.NODE_EXPRESS_PORT || "3000");


// on error section
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      logger.error('index.js : ' + port + " : requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error('index.js : ' + port + " : is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Listening server
const onListening = () => {
  const addr = server.address();
  logger.log('** Express Server Started : ' + JSON.stringify(addr));
};


//setting port for express application
app.set("port", port);

// creating the server
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

