const Blog = ({ user, blog, handleLikeClick, handleDelete }) => {

  if (!blog) return null;
  return (
    <ul className='blog'>
      <li><b>Title: </b>{blog.title} </li>
      <li><b>Author: </b>{blog.author}</li>
      <li><b>URL: </b><a href={blog.url}>{blog.url}</a></li>
      <li><b>Likes: </b>{blog.likes}
        {user && <button className='small-btn'
          onClick={() => handleLikeClick(blog)}>Like</button>}
      </li>
      <li><b>Added By: </b>{blog.user.name}</li>
      {user?.username === blog.user.username
        && <button className='small-btn' onClick={() => handleDelete(blog)}>Delete</button>}
    </ul>
  );
};

export default Blog;