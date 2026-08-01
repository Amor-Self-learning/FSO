import Blog from './Blog';

const Blogs = ({
  blogs,
  blogFormVisible,
  setBlogFormVisible,
  setMessage,
  user,
  handleDelete,
  handleLikeClick
}) => {
  return (
    <div className="blogs">
      <h2>Blogs</h2>
      {!blogFormVisible && <button onClick={() => setBlogFormVisible(true)}>Create new blog</button>}
      <ol className="blog-list">
        {blogs.sort((a, b) =>
          b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} username={user.username}
            setMessage={setMessage} handleDelete={() => handleDelete(blog)}
            handleLikeClick={(() => handleLikeClick(blog))}
          />
        )}
      </ol>
    </div>
  );
};

export default Blogs;