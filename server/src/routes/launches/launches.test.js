const request = require('supertest');
const app = require('../../app');
const { mongoConnect } = require('../../services/mongo');

describe('Test GET /launches', () => {
	beforeAll(async () => {
		await mongoConnect();
	});
	test('Is should respond with 200', async () => {
		await request(app)
			.get('/launches')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});
