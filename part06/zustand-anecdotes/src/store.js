import anecdoteService from '../services/anecdotes';

import { create } from 'zustand';
const asObject = anecdote => ({
  content: anecdote,
  votes: 0
})

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter : '',
  actions: {
    voteAnecdote: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id);
      const updated = await anecdoteService.update(
        id, {...anecdote, votes: anecdote.votes + 1}
      )
      set(state => ({
        anecdotes : state.anecdotes.map((a) =>
          a.id === id ? updated : a
        )
      }))
    },
    add: async anecdote => {
      const newAnecdote = await anecdoteService.create(asObject(anecdote));
      set( state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }));
    },
    setFilter: fill => set(() => ({filter: fill})),
    initialize: async () =>{
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
    delAnecdote: async id => {
      await anecdoteService.del(id);
      set(state => ({anecdotes: state.anecdotes.filter(a => a.id !== id)}));
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes);
  const filter = useAnecdoteStore(state => state.filter);
  return (filter && filter.trim().length > 0) 
    ? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    : anecdotes;
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
