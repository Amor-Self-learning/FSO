import { useVoteStatistics } from './store';

const Statistics = () => {
  const { good, bad, neutral } = useVoteStatistics();
  const all = good + bad + neutral;
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {all !== 0 ? (good - bad) / all : 0}</p>
      <p>Positive: {all !== 0 ? (good / all) * 100.0 : 0}%</p>
    </div>
  )
}

export default Statistics;