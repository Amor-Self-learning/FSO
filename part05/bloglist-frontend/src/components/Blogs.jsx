import Blog from './Blog';

const Blogs = ({blogs}) => {
  return (
    <div className="blogs">
      <h2>Blogs</h2>
      <ol className="blog-list">
        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
      </ol>
    </div>
  )
}

export default Blogs;