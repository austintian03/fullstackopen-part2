const Header = ({ name }) => {
  console.log("This course is", name)
  return (
    <h2>{name}</h2>
  )
}

const Part = ({ part }) => {
  console.log("This part is:", part)

  return (
    <p>
        {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  console.log(parts.length)
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} /> 
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  console.log(parts)
  return (
    //<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    <p><b>total of {parts.reduce((totalExercises, currentPart) => totalExercises + currentPart.exercises, 0)} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  //<Course course={course} />
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course course={course}/>
      )}
    </div>
  )
}

export default App