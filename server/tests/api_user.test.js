const supertest = require('supertest');
const mongoose = require('mongoose');

const _app = require('../src/app').default;
const app = supertest(_app);

const util = require('./test_util');

describe('user api test', () => {
  beforeEach(async () => {
    await util.resetUsersInDb();
  });

  test('all starter users are saved', async () => {
    const usernamesIndb = (await util.usersInDb()).map((e) => e.username);
    expect(usernamesIndb).toEqual(util.usersForTest.map((e) => e.username));
  });

  test('GET to /api/users returns all users from user collection', async () => {
    const res = await app.get('/api/users').expect(200);
    expect(res.body.map((e) => e.username)).toEqual(
      (await util.usersInDb()).map((e) => e.username)
    );
  });

  describe('POST to /api/users', () => {
    test('with a new username succeeds', async () => {
      const usersAtStart = await util.usersInDb();
      const newUser = {
        username: 'username0',
        password: 'password0',
      };

      await app
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await util.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test('with an existing username fails', async () => {
      const usersAtStart = await util.usersInDb();
      const newUser = util.usersForTest[0];

      await app
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await util.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test('with invalid username or password fails', async () => {
      const usersAtStart = await util.usersInDb();

      const tooShortUsername = {
        username: 'user',
        password: 'password0',
      };
      await app
        .post('/api/users')
        .send(tooShortUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const tooShortPassword = {
        username: 'username0',
        password: 'pass',
      };
      await app
        .post('/api/users')
        .send(tooShortPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const noUsername = {
        password: 'password0',
      };
      await app
        .post('/api/users')
        .send(noUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const noPassword = {
        username: 'username0',
      };
      await app
        .post('/api/users')
        .send(noPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const boolUsername = {
        username: true,
        password: 'password0',
      };
      await app
        .post('/api/users')
        .send(boolUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const nullPassword = {
        username: 'username0',
        password: null,
      };
      await app
        .post('/api/users')
        .send(nullPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await util.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
