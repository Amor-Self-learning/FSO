const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {listWithOneBlog, blogs} = require('./test_blogs');

describe("Author with most likes", () => {
  test('List with one blog returns the only author', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {author: 'Edsger W. Dijkstra', likes: 5});
  })

  test('Robert C. Martin is the author with most blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {author: 'Edsger W. Dijkstra', likes: 17});
  })
})