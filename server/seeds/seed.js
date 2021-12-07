const db = require('../config/connection');
const { ServicePost, User } = require('../models');

const userData = require('./userData.json');
const servicePostData = require('./servicePostData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await ServicePost.deleteMany({});


  const users = await User.insertMany(userData);
  const services = await ServicePost.insertMany(servicePostData);

  console.log('users and services are seeded!');
  process.exit(0);
});
