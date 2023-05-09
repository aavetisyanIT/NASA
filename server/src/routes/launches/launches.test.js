const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
	test('Is should respond with 200', async () => {
		await request(app)
			.get('/launches')
			.expect('Content-Type', /json/)
			.expect(200);
	});
});
