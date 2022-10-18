require('dotenv').config();

const http = require('http');

const app = require('./app');

const {mongoConnect} = require('./services/mongo')

const {loadPlanetsData} = require('./models/planets.model')

const {loadLaunchData} = require('./models/launches.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    
    server.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`)
    });
} 

startServer();