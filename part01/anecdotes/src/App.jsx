import { useState } from 'react'

const Anecdote = ({text, votes}) => {
  return <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [mostlikes, setMostlikes] = useState(0);
  const [mostLikedAnecdote, setMostLikedAnecdote] = useState(anecdotes[0]);

  const getNextAnecdote = () => {
    let updatedSelect = Math.floor(Math.random() * anecdotes.length);
    if (updatedSelect == selected) updatedSelect = Math.floor(Math.random() * anecdotes.length);
    setSelected(updatedSelect);
  }
  const voteCurrentAnecdote = () => {
    const currentVotes = [...votes];
    currentVotes[selected] ++;
    setVotes(currentVotes);
    if (currentVotes[selected] > mostlikes) {
      setMostlikes(currentVotes[selected]);
      setMostLikedAnecdote(anecdotes[selected]);
    }
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={getNextAnecdote}>next anecdote</button>
      <button onClick={voteCurrentAnecdote}>vote</button>
      <h2>Anecdote with most views</h2>
      <Anecdote text={mostLikedAnecdote} votes={mostlikes} />
    </div>
  )
}

export default App;
