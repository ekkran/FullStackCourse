const Header = ({name}) =>( 
    <h1>{name}</h1>
  )
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
  
    const content = parts.map((v,i) => {
      return <Part part={v} key = {i} />
    });
  
    return (
      <div>
        {content}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    let total = parts.reduce((s, p) => {
      return s + p.exercises;
    }, 0)
    return (
      <p>Number of exercises {total}</p>
    )
  }

   const Course = ({course}) => {    
    return (
      <div>
          <Header name={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts} />
      </div>
        )

  }

  export default Course