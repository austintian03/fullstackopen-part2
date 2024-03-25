const Header = (props) => {
  console.log("This course is", props.course)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  console.log("This part is:", props.part)

  return (
    <p>
        {props.part.name} {props.part.exercises}
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
    <p>Number of exercises {parts.reduce((totalExercises, currentPart) => totalExercises + currentPart.exercises, 0)}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App