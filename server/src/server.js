const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { loadPlanetData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const MONGO_URL =
	'mongodb+srv://nasa-api:xPFfRY4acW8x4Uet@cluster0.iujsfi3.mongodb.net/nasa?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
	console.log('MongoDB connection is ready');
});

mongoose.connection.on('error', error => {
	console.error(error);
});

async function startServer() {
	await mongoose.connect(MONGO_URL);
	await loadPlanetData();

	server.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

startServer();
