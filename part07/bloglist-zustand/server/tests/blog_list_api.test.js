const { test, after, describe, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const assert = require('node:assert');
const { blogs, users } = require('./test_blogs');
const User = require('../models/user');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany([...users.map((u) => u.user)]);
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});

describe('Blogs operations are working correctly', () => {
  test('All blogs are returned as json', async () => {
    const allBlogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(allBlogs.body.length, blogs.length);
  });

  test('All blogs unique identifier is named "id"', async () => {
    const allBlogs = await api.get('/api/blogs');
    const allIds = allBlogs.body.map((blog) => blog.id);
    assert(!allIds.includes(undefined));
  });

  test('A valid blog can be added', async () => {
    const allBlogsAtStart = await api.get('/api/blogs');
    const resp = await api
      .post('/api/login')
      .send({ username: users[0].user.username, password: users[0].password });
    const token = resp.body.token;
    const newBlog = {
      title: 'async/await is modern and easy',
      author: 'Abdul Samad',
      url: 'https://amorzephyr/blog/5a422aa71b54a676234d18f8.pdf',
      likes: 5,
    };
    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const allBlogsAtEnd = await api.get('/api/blogs');
    const allIds = allBlogsAtEnd.body.map((blog) => blog.id);
    assert.strictEqual(
      allBlogsAtEnd.body.length,
      allBlogsAtStart.body.length + 1
    );
    assert(allIds.includes(savedBlog.body.id));
  });

  test('New Blog without a likes parameter default likes to 0', async () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d18f8',
      title: 'async/await is modern and easy',
      author: 'Abdul Samad',
      url: 'https://amorzephyr/blog/5a422aa71b54a676234d18f8.pdf',
      user: users[0]._id,
      __v: 0,
    };

    const resp = await api
      .post('/api/login')
      .send({ username: users[0].user.username, password: users[0].password });
    const token = resp.body.token;

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const allBlogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(allBlogsAtEnd.body.length, blogs.length + 1);
    assert.strictEqual(result.body.likes, 0);
  });

  test("A blog with a missing title or url can't be added", async () => {
    const newBlog1 = {
      _id: '5a422aa71b54a676234d18f8',
      title: 'async/await is modern and easy',
      author: 'Abdul Samad',
      likes: 5,
      user: users[0]._id,
      __v: 0,
    };

    const resp = await api
      .post('/api/login')
      .send({ username: users[0].user.username, password: users[0].password });
    const token = resp.body.token;
    const newBlog2 = {
      _id: '5a422aa71b54a676234d18f8',
      author: 'Abdul Samad',
      url: 'https://amorzephyr/blog/5a422aa71b54a676234d18f8.pdf',
      likes: 5,
      user: users[0]._id,
      __v: 0,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog1)
      .expect(400);

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog2)
      .expect(400);

    const allBlogsAtEnd = await api.get('/api/blogs');
    assert.strictEqual(allBlogsAtEnd.body.length, blogs.length);
  });

  test('A blog can be deleted', async () => {
    const allBlogsAtStart = await api.get('/api/blogs');
    const blogToDelete = allBlogsAtStart.body[0];
    const u = users.find((u) => u.user.username === blogToDelete.user.username);
    const password = u.password;

    const resp = await api
      .post('/api/login')
      .send({ username: blogToDelete.user.username, password: password });
    const token = resp.body.token;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const allBlogsAtEnd = await api.get('/api/blogs');
    assert(allBlogsAtEnd.body.length, allBlogsAtStart.body.length - 1);
    const allIds = allBlogsAtEnd.body.map((blog) => blog.id);
    assert(!allIds.includes(blogToDelete.id));
  });

  test('A blog can be updated', async () => {
    const allBlogsAtStart = await api.get('/api/blogs');
    const blogToUpdate = allBlogsAtStart.body[0];
    const u = users.find((u) => u.user.username === blogToUpdate.user.username);
    const password = u.password;

    const resp = await api
      .post('/api/login')
      .send({ username: blogToUpdate.user.username, password: password });
    const token = resp.body.token;

    const updateBlog = {
      title: 'async/await is modern and easy',
      author: 'Abdul Samad',
      url: 'https://amorzephyr/blog/5a422aa71b54a676234d18f8.pdf',
      likes: 5,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateBlog)
      .expect(200);

    const allBlogsAtEnd = await api.get('/api/blogs');
    assert(allBlogsAtEnd.body.length, allBlogsAtStart.body.length + 1);
    const { title, author, url, likes } = allBlogsAtEnd.body[0];

    assert.strictEqual(allBlogsAtStart.body.length, allBlogsAtEnd.body.length);
    assert.strictEqual(title, updateBlog.title);
    assert.strictEqual(author, updateBlog.author);
    assert.strictEqual(url, updateBlog.url);
    assert.strictEqual(likes, updateBlog.likes);
  });

  after(async () => {
    mongoose.connection.close();
  });
});
