const supertest = require('supertest');
const mongoose = require('mongoose');

const _app = require('../src/app').default;
const app = supertest(_app);

test('request to unknown endpoint returns 404', async () => {
  await app
    .get('/****')
    .expect(404)
    .expect('Content-Type', /application\/json/);
});
test('http GET to root URL returns 200', async () => {
  await app.get('/').expect(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});
