import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote, addAnecdoteToServer } from '../services/anecdotes'
import useNotify from './useNotify';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();
  const newNoteMutations = useMutation({
    mutationFn: addAnecdoteToServer,
    onError: () => {
      notify({ message: 'Too short anecdote, must have length of at least 5'})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  });

  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  });

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  });

  return {
    anecdotes: data,
    newNoteMutations,
    isPending,
    isError,
    voteMutation
  }
}