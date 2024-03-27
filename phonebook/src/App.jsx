import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  console.log('render', persons.length, 'persons') 

  const addOrUpdatePerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson && window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = { ...existingPerson, number: newNumber}
      phonebookService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          setIsSuccess(true)
          setMessage(`Updated number for ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== existingPerson.id))
          setIsSuccess(false)
          setMessage(`Information of ${existingPerson.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setIsSuccess(true)
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }
  
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
        })
    } 
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value.toLowerCase()) 
  }

  const peopleToShow = (searchTerm === '') ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm))
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} isSuccess={isSuccess}/>

      <Filter searchTerm={searchTerm} onChange={handleSearchChange} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addOrUpdatePerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3> 

      <Persons persons={peopleToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App