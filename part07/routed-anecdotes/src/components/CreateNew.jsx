import { useNavigate } from 'react-router-dom'
import { useAnecdotes, useField } from '../hooks';

const CreateNew = () => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');
  const { addAnecdote } = useAnecdotes();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: content.data.value, author: author.data.value, info: info.data.value, votes: 0 })
    navigate('/')
  }

  const resetForm = () => {
    content.reset();
    author.reset();
    info.reset();
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.data}/>
        </div>
        <div>
          author
          <input {...author.data} />
        </div>
        <div>
          url for more info
          <input {...info.data} />
        </div>
        <button>create</button>
        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
