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
  console.log("There are", parts.length, "parts to this course")
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} /> 
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  return (
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

export default Course