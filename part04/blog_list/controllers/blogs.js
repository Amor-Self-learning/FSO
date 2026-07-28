const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
});

blogsRouter.post('/', async (req, res) => {
  if (!req.body.url || !req.body.title) return res.status(400).send("Blog must have a title and a url");
  const blog = new Blog({...req.body, likes : req.body.likes || 0});
  const result = await blog.save()
  res.status(201).json(result);
});

module.exports = blogsRouter;