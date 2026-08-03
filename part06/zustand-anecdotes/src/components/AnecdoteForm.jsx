import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const addAnecdote = (e) => {
    e.preventDefault();
    add(e.target.anecdote.value);
    e.target.reset();
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm;