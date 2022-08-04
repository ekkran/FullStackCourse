import { useState } from 'react'

const Header = ({title}) => (
  <h1>{title}</h1>
)

const Content = ({goodCB, neutralCB, badCB}) => {
  return(
    <div>
      <FeedBackButton text="good" callback={goodCB}/>
      <FeedBackButton text="neutral" callback={neutralCB}/>
      <FeedBackButton text="bad" callback={badCB}/>
    </div>
  )
}

const FeedBackButton = ({text, callback}) => (
  <button onClick={callback}>{text}</button>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  if(total > 0){
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text={"good"} value={good}/>
            <StatisticsLine text={"neutral"} value={neutral}/>
            <StatisticsLine text={"bad"} value={bad}/>
            <StatisticsLine text={"all"} value={total}/>
            <StatisticsLine text={"average"} value={total / 3}/>
            <StatisticsLine text={"positive"} value={(((good+neutral)/total)*100) + "%"}/>
          </tbody>
        </table>
      </div>
    )
  }else{
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodCB = () => {
    setGood(good + 1);
  }

  const neutralCB = () => {
    setNeutral(neutral + 1);
  }
  const badCB = () => {
    setBad(bad + 1);
  }
  const title = "Give Feedback"

  return (
    <div>
      <Header title={title}/>
      <Content goodCB={goodCB} neutralCB={neutralCB} badCB={badCB} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App