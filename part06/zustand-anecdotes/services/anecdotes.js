const baseUrl = 'http://localhost:3000/anecdotes';

const getAll = async () => {
  const res = await fetch(baseUrl);
  if (!res.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await res.json();
}

const create = async (anecdote) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(anecdote)
  });
  if (!res.ok) {
    throw new Error ("Failed to add new anecdote.")
  }
  return await res.json();
}

const update = async (id, anecdote) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(anecdote)
  });
  if (!res.ok) {
    throw new Error('Failed to update anecdote');
  }
  return await res.json();
}

const del = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  });
  if (!res.ok) {
    throw new Error('Failed to delete anecdote');
  }
  return await res.json();
}

export default { getAll, create, update, del } ;