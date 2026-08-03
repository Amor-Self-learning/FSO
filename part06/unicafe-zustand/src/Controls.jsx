import { useVoteControls } from './store';

const Controls = () => {
  const { voteGood, voteBad, voteNeutral } = useVoteControls();
  return (
    <div>
      <button onClick={voteGood}>Good</button>
      <button onClick={voteBad}>Bad</button>
      <button onClick={voteNeutral}>Neutral</button>
    </div>
  )
}

export default Controls;