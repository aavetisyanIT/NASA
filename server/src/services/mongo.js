const mongoose = require('mongoose');

const MONGO_URL =
	'mongodb+srv://nasa-api:xPFfRY4acW8x4Uet@cluster0.iujsfi3.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
	console.log('MongoDB connection is ready');
});

mongoose.connection.on('error', error => {
	console.error(error);
});

async function mongoConnect() {
	await mongoose.connect(MONGO_URL);
}

module.exports = { mongoConnect };
