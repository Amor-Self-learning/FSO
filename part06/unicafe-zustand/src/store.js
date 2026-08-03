import { create } from 'zustand';

const useStatisticsStore = create (set => ({
  good: 0,
  bad: 0,
  neutral: 0,
  actions : {
    voteGood: () => set(state => ({ good: state.good + 1 })),
    voteBad: () => set(state => ({ bad: state.bad + 1 })),
    voteNeutral: () => set(state => ({neutral: state.neutral + 1})),
  }
}));

export const useVoteControls = () => useStatisticsStore(state => state.actions);
export const useVoteStatistics = () => {
  const good = useStatisticsStore(state => state.good);
  const bad = useStatisticsStore(state => state.bad);
  const neutral = useStatisticsStore(state => state.neutral);
  return { good, bad, neutral };
};
