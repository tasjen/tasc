const _app = require('../src/app').default;
const supertest = require('supertest');
const app = supertest(_app);

describe('HTTP GET to', () => {
  test('unknown endpoint returns 404', async () => {
    await app
      .get('/****')
      .expect(404)
      .expect('Content-Type', /application\/json/);
  });
  test('root URL returns 200', async () => {
    await app
      .get('/')
      .expect(200)
  })
});

module.exports = app;
