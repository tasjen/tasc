const supertest = require('supertest');
const mongoose = require('mongoose');

const _app = require('../src/app').default;
const app = supertest(_app);

const util = require('./test_util');

describe('project api test', () => {
  beforeAll(async () => {
    await util.resetUsersInDb();
  });

  // beforeEach(async () => {
  //   await util.resetProjectsInDb();
  // });

  test('GET to /api/projects returns all projects from project collection', async () => {
    const res = await app.get('/api/projects').expect(200);
    expect(res.body.map((e) => e.name)).toEqual(
      (await util.projectsInDb()).map((e) => e.name)
    );
  });

  describe('POST to /api/projects', () => {
    let loginResponse = [];
    beforeAll(async () => {
      const res1 = await app.post('/api/login').send(util.usersForTest[0]);
      loginResponse[0] = res1.body;

      const res2 = await app.post('/api/login').send(util.usersForTest[1]);
      loginResponse[1] = res2.body;
    });

    test('succeeds with valid request body', async () => {
      const projectsBefore = await util.projectsInDb();
      const projectToAdd = { name: 'projectName0' };

      await app
        .post('/api/projects')
        .send(projectToAdd)
        .set({ Authorization: `Bearer ${loginResponse[0].token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const projectsAfter = await util.projectsInDb();
      expect(projectsAfter).toHaveLength(projectsBefore.length + 1);

      const projectNames = projectsAfter.map((p) => p.name);
      expect(projectNames).toContain(projectToAdd.name);
    });

    test('fails with invalid request body', async () => {
      const projectsBefore = await util.projectsInDb();

      const dupName = {
        name: 'projectName0',
      };
      await app
        .post('/api/projects')
        .send(dupName)
        .set({ Authorization: `Bearer ${loginResponse[0].token}` })
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const tooShortName = {
        name: '',
      };
      await app
        .post('/api/projects')
        .send(tooShortName)
        .set({ Authorization: `Bearer ${loginResponse[1].token}` })
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const invalidTypeName = {
        name: true,
      };
      await app
        .post('/api/projects')
        .send(invalidTypeName)
        .set({ Authorization: `Bearer ${loginResponse[0].token}` })
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const noName = {
        username: 'usernameee',
        password: 'passs',
      };
      await app
        .post('/api/projects')
        .send(noName)
        .set({ Authorization: `Bearer ${loginResponse[0].token}` })
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const projectsAfter = await util.projectsInDb();
      expect(projectsAfter).toHaveLength(projectsBefore.length);
    });

    test('fails with invalid or no authorization header', async () => {
      const projectsBefore = await util.projectsInDb();
      const projectToAdd = { name: 'projectName0' };

      const invalidToken = {
        Authorization: `Bearer ${loginResponse[0].token.slice(1)}`,
      };
      await app
        .post('/api/projects')
        .send(projectToAdd)
        .set(invalidToken)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const noBearer = {
        Authorization: loginResponse[0].token,
      };
      await app
        .post('/api/projects')
        .send(projectToAdd)
        .set(noBearer)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const noAuthHeader = {
        token: `Bearer ${loginResponse[0].token}`,
      };
      await app
        .post('/api/projects')
        .send(projectToAdd)
        .set(noAuthHeader)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const projectsAfter = await util.projectsInDb();
      expect(projectsAfter).toHaveLength(projectsBefore.length);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
