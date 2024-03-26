const Person = ({ person, onClick }) => {
   return (
      <p>{person.name} {person.number} <button onClick={onClick}>delete</button></p>
   )
}

const Persons = ({ persons, handleDelete }) => {
   return (
    <div>
        {persons.map(person => 
            <Person key={person.name} person={person} onClick={() => handleDelete(person.id)}/>
        )}
   </div>
   )
}

export default Persons