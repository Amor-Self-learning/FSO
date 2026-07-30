const Blog = ({blog}) => {
  return (
    <li>
      <ul className="blog">
        <li><b>ID:</b> {blog.id}</li>
        <li><b>Title: </b>{blog.title}</li>
        <li><b>Author: </b>{blog.author}</li>
        <li><b>URL: </b>{blog.url}</li>
        <li><b>Likes: </b>{blog.likes}</li>
        <li><b>Username: </b>{blog.user.username}</li>
      </ul>
    </li>
  )
}

export default Blog;