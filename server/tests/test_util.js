const User = require('../src/models/user_model').default;
const Project = require('../src/models/project_model').default;

const usersForTest = [
  {
    username: 'username1',
    password: 'password1',
  },
  {
    username: 'username2',
    password: 'password2',
  },
  {
    username: 'username3',
    password: 'password3',
  },
];

const projectsForTest = [
  {
    name: 'projectName1',
  },
  {
    name: 'projectName2',
  },
  {
    name: 'projectName3',
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const projectsInDb = async () => {
  const projects = await Project.find({});
  return projects.map((project) => project.toJSON());
};

const resetUsersInDb = async () => {
  await User.deleteMany({});
  await Project.deleteMany({});
  const userDocuments = usersForTest.map((u) => new User(u));
  for (let u of userDocuments) await u.save();
};

// const resetProjectsInDb = async () => {
//   const userOne = await User.findOne({
//     username: usersForTest[0].username,
//   }).populate('projects');

//   userOne.projects = [];
//   await Project.deleteMany({});
//   for (let p of projectsForTest) {
//     const newProject = await new Project({ ...p, user: userOne._id }).save();
//     userOne.projects = [...userOne.projects, newProject._id];
//     await userOne.save();
//   }
// };

module.exports = {
  usersForTest,
  projectsForTest,
  usersInDb,
  projectsInDb,
  resetUsersInDb,
  // resetProjectsInDb,
};
