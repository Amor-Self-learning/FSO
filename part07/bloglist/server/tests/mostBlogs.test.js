const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {listWithOneBlog, blogs} = require('./test_blogs');

describe("Author with most blogs", () => {
  test('List with one blog returns the write author', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {author: 'Edsger W. Dijkstra', blogs: 1});
  })

  test('Robert C. Martin is the author with most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {author: 'Robert C. Martin', blogs: 3});
  })
})