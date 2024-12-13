import { useState, useEffect } from 'react'
import personService from './services/persons'

const ErrorMsg = ({error}) => {
  if(error === null){
    return null
  }
  return (
    <div className='error'>
      {error}
    </div>
  )
}

const InfoMsg = ({msg}) => {
  if(msg === null){
    return null
  }
  return (
    <div className='succesful'>
      {msg}
    </div>
  )
}

const Form = ({onNameChange, onNumberChange, onSubmit}) => {
  return (
    <div>
      <form>
          <div>
            name: <input onChange={onNameChange}/>
          </div>
          <div>
            number: <input onChange={onNumberChange} />
          </div>
          <div>
            <button type="submit" onClick={onSubmit}>add</button>
          </div>
        </form>
    </div>
  )
}

const Filter = ({onFilterChange}) => {
  return (<div>
    Filter by: <input onChange={onFilterChange}></input>
  </div>)
}

const Display = ({personsToShow, onItemRemove}) => {

  const handleRemove = (name) => {
    return () => {
      onItemRemove(name)
    }
  }

  return (
    <div>
      <ul>
        {personsToShow.map((item) => {
          return <li key={item.name}>{item.name} : {item.number} <button onClick={handleRemove(item.name)}>Delete</button> </li>
        })}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then((response) => setPersons(response))
    .catch((error) =>{
      setError(error.message)
      setTimeout(() => {
        setError(null)
      }, 5000)
    })
  }, [])

  const personsToShow = persons.filter(x => x.name.toLowerCase().includes(filter))

  const GetId = () => {
    return persons.length
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleRemove = (name) => {
    if(confirm(`delete ${name}?`)){
      personService.remove(persons.find(x => x.name === name).id)
      const newList = persons.filter(x => x.name !== name)
      setPersons(newList)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const index = persons.findIndex(x => x.name === newName)
    if(index >= 0){
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const newItem = {
          id : Number.parseInt(persons[index].id),
          name: newName,
          number: newNumber
        }
        const updatedPersons = persons.filter(x => x.name !== newName).concat(newItem)        
        setPersons(updatedPersons)
        personService
        .update(persons[index].id, newItem)
        .then(() => {
          setMessage(`Updated ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 500);
        })
        .catch(() => {
          setError(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 500);
        })
      }
      return
    }
    const newPerson = {
      id: GetId(),
      name: newName,
      number: newNumber
    }
    personService.create(newPerson)
    const updatedPersons = persons.concat(newPerson)
    setPersons(updatedPersons)
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 500);
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMsg error={error}></ErrorMsg>
      <InfoMsg msg={message}></InfoMsg>
      <Form onNameChange={handleNameChange} 
            onNumberChange={handleNumberChange} 
            onSubmit={handleSubmit}>
      </Form>
      <h2>Numbers</h2>
      <Filter onFilterChange={handleFilterChange}></Filter>
      <Display 
      personsToShow={personsToShow}
      onItemRemove={handleRemove}>
      </Display>
    </div>
  )
}

export default App