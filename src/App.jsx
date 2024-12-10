import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedPersons = persons.concat({name: newName})
    setPersons(updatedPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((item) => {
            return <li key={item.name}>{item.name}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default App