const blogsRouter = require('express').Router();
const logger = require('../utils/logger');
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name : 1})
  res.json(blogs)
});

blogsRouter.post('/',middleware.tokenExtractor, middleware.userExtractor , async (req, res) => {
  if (!req.body.url || !req.body.title) return res.status(400).send("Blog must have a title and a url");
  const user = req.user;
  if (!user) {
    return res.status(400).json({error: 'UserId is missing or invalid'})
  }
  const blog = new Blog({...req.body, likes : req.body.likes || 0, user: user._id});
  const result = await blog.save()
  logger.info(user);
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  res.status(201).json(result);
});

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async(req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({error: 'UserId is missing or invalid'})
  }
  const blogToDel = await Blog.findById(req.params.id);
  if (blogToDel.user.toString() === user.id) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).send({error : "You are not authorized to delte this blog"})
  }
})

blogsRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async(req, res) => {
  if (!req.body.url || !req.body.title) return res.status(400).send("Blog must have a title and a url");
  const user = req.user;
  if (!user) {
    return res.status(400).json({error: 'UserId is missing or invalid'})
  }
  const {title, author, url, likes} = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).end();
  if(blog.user.toString() === user.id) {
    blog.title = title;
    blog.author = author;
    blog.url = url;
    blog.likes = likes;

  const updatedBlog = await blog.save();
  res.json(updatedBlog);
  } else {
    res.status(401).json({error: 'You are not authorized to update this blog.'})
  }
})
module.exports = blogsRouter;