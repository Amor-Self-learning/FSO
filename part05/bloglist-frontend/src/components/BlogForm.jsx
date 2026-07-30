import axios from "axios";
import { useState } from "react";

const BlogForm = ({action, user, addToBlogs, setMessage, setBlogFormVisible}) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  
  const addBlog = async () => {
    if (!user || !user.token) return;
    const newBlog = {title, author, url};
    const res = await axios.post(action, newBlog, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    addToBlogs({...res.data, user : {id: res.data.user, username : user.username, name : user.name}});
    setMessage({text: `Added a new blog ${title} by ${author}`, ok: true});
    setTitle('');
    setAuthor('');
    setUrl('');
    setBlogFormVisible(false);
  }
  return (
    <form action={action}>
      <div className="input-div">
        <label htmlFor="title">Title: </label>
        <input 
          type="text" 
          id="title" 
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required/>
      </div>
      <div className="input-div">
        <label htmlFor="author">Author: </label>
        <input 
          type="text" 
          id="author" 
          name="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required/>
      </div>
      <div className="input-div">
        <label htmlFor="url">URL: </label>
        <input 
          type="text" 
          id="url" 
          name="url" 
          value={url}
          onChange={e => setUrl(e.target.value)}
          required/>
      </div>
      <button onClick={addBlog} type='button'>Create</button>
      <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
    </form>
  )
}

export default BlogForm;