const dummy = () => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.find(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  );
};

const mostBlogs = (blogs) => {
  const authors = [];
  const findAuthorIndex = (name) => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].author.toLowerCase() === name.toLowerCase()) return i;
    }
    return -1;
  };
  for (const blog of blogs) {
    const authorIndex = findAuthorIndex(blog.author);
    if (authorIndex === -1) authors.push({ author: blog.author, blogs: 1 });
    else authors[authorIndex].blogs++;
  }
  return authors.find(
    (author) =>
      author.blogs === Math.max(...authors.map((author) => author.blogs))
  );
};

const mostLikes = (blogs) => {
  const authors = [];
  const findAuthorIndex = (name) => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].author.toLowerCase() === name.toLowerCase()) return i;
    }
    return -1;
  };
  for (const blog of blogs) {
    const authorIndex = findAuthorIndex(blog.author);
    if (authorIndex === -1)
      authors.push({ author: blog.author, likes: blog.likes });
    else authors[authorIndex].likes += blog.likes;
  }
  return authors.find(
    (author) =>
      author.likes === Math.max(...authors.map((author) => author.likes))
  );
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
