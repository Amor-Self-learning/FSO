import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes';


const App = () => {

  const { isPending, isError, anecdotes, voteMutation } = useAnecdotes();

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  if (isPending) return <div>Loading Data...</div>
  if (isError) return <div>Anecdote service is not available due to problems in server.</div>

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App