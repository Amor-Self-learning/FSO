const baseURL = 'http://localhost:3001/anecdotes';

const getAnecdotes = async () => {
  const res = await fetch(baseURL);
  if(!res.ok) throw new Error('Failed to fetch anecdotes');
  return await res.json();
}

const addAnecdoteToServer = async (content) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({content, votes: 0})
  }
  const res = await fetch(baseURL, options);
  if (!res.ok) throw new Error('Failed to add new anecdote');
  return await res.json();
}

const updateAnecdote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  }
  const res = await fetch(`${baseURL}/${anecdote.id}`, options)
  if (!res.ok) throw new Error('Failed to updated anecodte')
  return await res.json()
}
export { getAnecdotes, addAnecdoteToServer, updateAnecdote };