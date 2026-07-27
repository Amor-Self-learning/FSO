const {listWithOneBlog, blogs} = require('./test_blogs');
const listHelper = require('../utils/list_helper');
const {describe, test} = require('node:test');
const assert = require('node:assert');

describe ('Favorite Blog', () => {
  test('The only blog is the favorite one', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0]);
  })

  test('"Canonical string reduction" is the most favorite blog post', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
  })
})