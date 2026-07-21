import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({text, value}) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
}

const Statistics = ({good, bad, neutral, all}) => {
  return all == 0 
  ? <>
    <div>No feedback given</div>
  </>
  :<table>
    <tbody>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={(good - bad) / all} />
      <StatisticLine text='positive' value={(good / all * 100) + ' %'} />
    </tbody>
  </table>
}

const  App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setall] = useState(0);

  const incrementGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setall(bad + neutral + updatedGood);
  };
  const incrementNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setall(bad + good + updatedNeutral);
  };
  const incrementBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setall(updatedBad + good + neutral);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incrementGood} text='good'/>
      <Button onClick={incrementNeutral} text='neutral' />
      <Button onClick={incrementBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  )
}

export default App
