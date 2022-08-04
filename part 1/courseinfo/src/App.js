const Header = (props) =>( 
  <h1>{props.course}</h1>
)

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {

  const content = props.parts.map((v,i) => {
    return <Part part={v} key = {i} />
  });

  return (
    <div>
      {content}
    </div>
  )
}

const Total = (props) => {
  let total = 0;
  props.parts.forEach((v) => {
    total += v.exercises
  });
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      }, 
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}  />
       <Total parts={course.parts} />
    </div>
  )
}

export default App