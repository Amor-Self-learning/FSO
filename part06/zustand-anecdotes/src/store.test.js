import { describe, expect, beforeEach, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  }
}));

import anecdoteService from './services/anecdotes';
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from './store';
beforeEach (() => {
  useAnecdoteStore.setState({anecdotes: [], filter: ''});
  vi.clearAllMocks();
});

describe('userAnecdotes', () => {
  it('Initializes loads anecdotes from service', async () => {
    const mockAnecdotes = [{id: 1, content: 'Test', votes: 1}];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => ({
      actions: useAnecdoteActions(),
      anecdotes: useAnecdotes()
    }));
    await act(async () => {
      await result.current.actions.initialize();
    });
    expect(result.current.anecdotes).toEqual(mockAnecdotes);
  });

  it('Anecdotes are sorted by votes', async () => {
    const mockAnecdotes = [
      {id: 1, content: 'Test1', votes: 1},
      {id: 2, content: 'Test2', votes: 2}
    ];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => ({
      anecdotes: useAnecdotes(),
      actions: useAnecdoteActions()
    }));
    await act(async () => {
      await result.current.actions.initialize();
    });

    expect(result.current.anecdotes[0]).toEqual(mockAnecdotes[1]);
    expect(result.current.anecdotes[1]).toEqual(mockAnecdotes[0]);
  });

  it('Anecdotes are properly filtered', async () => {
    const mockAnecdotes = [
      {id: 1, content: 'Hello Test1', votes: 1},
      {id: 2, content: 'World Test2', votes: 2}
    ];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => ({
      anecdotes: useAnecdotes(),
      actions: useAnecdoteActions()
    }));
    await act(async () => {
      await result.current.actions.initialize();
      await result.current.actions.setFilter('World')
    });

    expect(result.current.anecdotes.length).toBe(1);
    expect(result.current.anecdotes[0]).toEqual(mockAnecdotes[1])
  });

  it('Increase anecdote vote', async () => {
    const anecdote = {id: 1, content: 'Hello Test1', votes: 1};
    useAnecdoteStore.setState({anecdotes: [anecdote]})
    anecdoteService.update.mockResolvedValue({...anecdote, votes: anecdote.votes + 1});

    const { result } = renderHook(() => ({
      anecdotes: useAnecdotes(),
      actions: useAnecdoteActions()
    }));
    await act(async () => {
      await result.current.actions.initialize();
      await result.current.actions.voteAnecdote(1);
    });

    expect(result.current.anecdotes[0].votes).toBe(2);
  });
});