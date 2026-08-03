import { useAnecdotes } from '../store'
import { useAnecdoteActions } from '../store'

const AnecdoteList = () => {
const anecdotes = useAnecdotes();
const { voteAnecdote } = useAnecdoteActions();
  return (
    <>
      {(anecdotes.toSorted((a, b) => b.votes - a.votes)).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList;