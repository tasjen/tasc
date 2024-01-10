const supertest = require('supertest');
const mongoose = require('mongoose');

const _app = require('../src/app').default;
const app = supertest(_app);

const util = require('./test_util');

describe('login api test', () => {
  beforeEach(async () => {
    await util.resetUsersInDb();
  });

  test('login succeeds with correct username and password', async () => {
    const userToLogin = util.usersForTest[0];
    const res = await app
      .post('/api/login')
      .send(userToLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(res.body).toHaveProperty('token');
    expect(res.body.username).toBe(userToLogin.username);
  });

  test('login fails with incorrect username or password', async () => {
    const incorrectUsername = {
      username: 'username0',
      password: 'password0',
    };
    const res1 = await app
      .post('/api/login')
      .send(incorrectUsername)
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(res1.body).toHaveProperty('error');
    expect(res1.body.error).toBe('invalid username or password');

    const incorrectPassword = {
      username: 'username1',
      password: 'password0',
    };
    const res2 = await app
      .post('/api/login')
      .send(incorrectPassword)
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(res2.body).toHaveProperty('error');
    expect(res2.body.error).toBe('invalid username or password');

    const missingUsername = {
      password: 'password1',
    };
    const res3 = await app
      .post('/api/login')
      .send(missingUsername)
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(res3.body).toHaveProperty('error');
    expect(res3.body.error).toBe('invalid username or password');

    const missingPassword = {
      username: 'username1',
    };
    const res4 = await app
      .post('/api/login')
      .send(missingPassword)
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(res4.body).toHaveProperty('error');
    expect(res4.body.error).toBe('invalid username or password');

    const invalidTypes = {
      username: 123456,
      password: false
    };
    const res5 = await app
      .post('/api/login')
      .send(invalidTypes)
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(res5.body).toHaveProperty('error');
    expect(res5.body.error).toBe('invalid username or password');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
