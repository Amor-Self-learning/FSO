import { useAnecdotes } from '../store';
import { useAnecdoteActions } from '../store';
import useNotificationStore from '../notificationStore';

const AnecdoteList = () => {
const { setMessage } = useNotificationStore();
const anecdotes = useAnecdotes();
const { voteAnecdote, delAnecdote } = useAnecdoteActions();
const vote = (anecdote) => {
  voteAnecdote(anecdote.id);
  setMessage(`Voted Anecdote ${anecdote.content}`, true)
}
const deleteAnecdote = (anecdote) => {
  delAnecdote(anecdote.id);
  setMessage(`Deleted Anecdote ${anecdote.content}`, false )
}
  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            <button onClick={() => deleteAnecdote(anecdote)}>delete</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList;