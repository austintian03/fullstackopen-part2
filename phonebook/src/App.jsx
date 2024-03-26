import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  console.log('render', persons.length, 'persons') 

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
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

      <Filter searchTerm={searchTerm} onChange={handleSearchChange} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3> 

      <Persons persons={peopleToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App