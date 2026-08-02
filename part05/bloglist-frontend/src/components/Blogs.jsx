import { Link } from 'react-router-dom';

const Blogs = ({
  blogs
}) => {
  return (
    <div className="blogs">
      <h2>Blogs</h2>
      <ol className="blog-list">
        {blogs.sort((a, b) =>
          b.likes - a.likes).map(blog =>
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link></li>
        )}
      </ol>
    </div>
  );
};

export default Blogs;