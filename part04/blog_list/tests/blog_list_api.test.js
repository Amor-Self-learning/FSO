const {test, after, beforeEach} = require('node:test');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const assert = require('node:assert');
const Blog = require('../models/blog');
const {blogs} = require('./test_blogs');

const api  = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(blogs);
})

test('All blogs are returned as json', async () => {
  const allBlogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  assert.strictEqual(allBlogs.body.length, blogs.length);
});

test('All blogs unique identifier is named "id"', async () => {
  const allBlogs = await api.get('/api/blogs');
  const allIds = allBlogs.body.map(blog => blog.id);
  assert(!allIds.includes(undefined))
});

test('A valid blog can be added', async () => {
  const allBlogsAtStart = await api.get('/api/blogs');
  const newBlog = {
    _id: '5a422aa71b54a676234d18f8',
    title: 'async/await is modern and easy',
    author: 'Abdul Samad',
    url: 'https://amorzephyr/blog/5a422aa71b54a676234d18f8.pdf',
    likes: 5,
    __v: 0
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const allBlogsAtEnd = await api.get('/api/blogs');
  const allIds = allBlogsAtEnd.body.map(blog => blog.id);
  assert.strictEqual(allBlogsAtEnd.body.length, allBlogsAtStart.body.length + 1);
  assert(allIds.includes(newBlog._id));
});

test('New Blog without a likes parameter default likes to 0', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d18f8',
    title: 'async/await is modern and easy',
    author: 'Abdul Samad',
    url: 'https://amorzephyr/blog/5a422aa71b54a676234d18f8.pdf',
    __v: 0
  };

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(result.body.likes, 0);
})

test('A blog with a missing title or url can\'t be added', async () => {
  const allBlogsAtStart = await api.get('/api/blogs');
  const newBlog1 = {
    _id: '5a422aa71b54a676234d18f8',
    title: 'async/await is modern and easy',
    author: 'Abdul Samad',
    likes: 5,
    __v: 0
  };
  const newBlog2 = {
    _id: '5a422aa71b54a676234d18f8',
    author: 'Abdul Samad',
    url: 'https://amorzephyr/blog/5a422aa71b54a676234d18f8.pdf',
    likes: 5,
    __v: 0
  };

  await api
    .post('/api/blogs')
    .send(newBlog1)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)

  const allBlogsAtEnd = await api.get('/api/blogs');
  assert.strictEqual(allBlogsAtEnd.body.length, allBlogsAtStart.body.length);
});

after(async () => {
  mongoose.connection.close();
})