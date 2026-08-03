import useNotificationStore from '../notificationStore';
import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { setMessage } = useNotificationStore();

  const addAnecdote = (e) => {
    e.preventDefault();
    add(e.target.anecdote.value);
    e.target.reset();
    setMessage(`Added Anecdote ${e.target.anecdote}`, true)
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