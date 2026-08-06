const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {listWithOneBlog, blogs} = require('./test_blogs');

describe('List likes', () => {
  test('All Blog likes is equal to 36', () => {
    assert(listHelper.totalLikes(blogs), 36);
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})