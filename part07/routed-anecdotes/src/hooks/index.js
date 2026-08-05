import { useEffect, useState } from "react";
import anecdoteService from '../services/anecdotes';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const reset = () => {
    setValue('');
  }
  return {
    data: {
      type,
      value,
      onChange,
    },
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  })

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then(newAnecdote => setAnecdotes(anecdotes.concat(newAnecdote)))
  }

  const deleteNote = (id) => {
    anecdoteService.del(id).then(() => setAnecdotes(anecdotes.filter(a => a.id !== id)));
  }

  return {
    anecdotes,
    addAnecdote,
    deleteNote
  }
}