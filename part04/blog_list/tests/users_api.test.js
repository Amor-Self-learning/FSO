const {test, after, describe, beforeEach} = require('node:test');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const assert = require('node:assert');
const User = require('../models/user');

const api = supertest(app);

const initialUsers = [
  {
    username : 'amorzephyr',
    name : 'Abdul Samad',
    password : 'Numl@ComputerScience'
  }
]
describe('User with and invalid username or password can\'t be added', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers);
  })

  test ('User with invalid or missing username can\'t be added', async () => {
    const newUser = {username : 'hi', name : 'okbro', password : 'password'};
    const newUser2 = { name : 'okbro', password : 'password'};
    const usersAtStart = await api.get('/api/users');
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
    
    await api
      .post('/api/users')
      .send(newUser2)
      .expect(400);
    
    const usersAtEnd = await api.get('/api/users');
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  })

  test ('User with invalid or missing password can\'t be added', async () => {
    const newUser = {username : 'hipe', name : 'okbro', password : 'hm'};
    const newUser2 = { username: 'hipe', name : 'okbro'};
    const usersAtStart = await api.get('/api/users');
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
    
    await api
      .post('/api/users')
      .send(newUser2)
      .expect(400);
    
    const usersAtEnd = await api.get('/api/users');
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  })
}) 

after(async () => {
  await mongoose.connection.close();
})