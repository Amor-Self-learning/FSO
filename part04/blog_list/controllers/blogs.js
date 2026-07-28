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

blogsRouter.delete('/:id', async(req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
})

blogsRouter.put('/:id', async(req, res) => {
  const {title, author, url, likes} = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).end();
  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
})
module.exports = blogsRouter;