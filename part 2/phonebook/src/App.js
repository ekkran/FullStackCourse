import { useState, useEffect } from 'react'
import personService from './Service'

const Contact = ({contact}) => {
  return <div>
    <p>{contact.name} - {contact.number}</p>
  </div>
}

const Filter = ({searchValue, handler}) => {
  return (
    <div>
      Search: <input value={searchValue} onChange={handler} />
    </div>
    )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.text}
    </div>
  )
}

const ContactForm = ({handleSubmit, namevalue, nameHandler, numbervalue, numberHandler}) => {
  return <form onSubmit={handleSubmit}>

        <div>
          name: <input value={namevalue} onChange={nameHandler}/>
        </div>
        <div>
          number: <input value={numbervalue} onChange={numberHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
}

const Persons = ({list, handler}) => {
  return <div>
    {list.map((v) => { 
        return <div key={v.id}>
          <Contact contact={v}/>
          <button onClick={() => handler(v.id)}>delete</button>
        </div>
    })}
  </div>
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)

  const handleNameChange = (event)  => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event)  => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange =(event) => {
    setNameFilter(event.target.value)
  }

  const handleDelete = id => {
    const person = persons.find(x => x.id == id)
    if(window.confirm(`Delete ${person.name}`)){
      personService.deleteItem(id).then(() => {
        setPersons(persons.filter(x => x.id !== person.id))
      })
    }
    
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.findIndex(contact => contact.name === newName) < 0){
      personService
        .create({name: newName, number: newNumber, id: persons.length})
        .then(data => {
          setPersons(persons.concat(data))
          setMessage(
            {
              text:`${data.name} was added`,
              type: "info"
            }
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    else{
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const id = persons.find(x => x.name === newName).id
        personService
          .update(id, 
          {
            name: newName, 
            id: id, 
            number: newNumber
          }).then((data) => {
            setPersons(persons.map(x => {
            if(x.id === data.id){
              x.number = data.number
            }
            return x;
            }))

            setMessage(
              {
                text:`${data.name} number was changed`,
                type:"info"
              }
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((data) => {
            setMessage(
              {
                text:`${newName} was delete from the database`,
                type:"error"
              }
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }
  }

  const phonebookList = () => persons.filter(x => x.name.toLowerCase().includes(nameFilter.toLowerCase()));


  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchValue={nameFilter} handler={handleFilterChange} />

      <h3>Add a new</h3>
      <ContactForm handleSubmit={handleSubmit} namevalue={newName} nameHandler={handleNameChange}
            numbervalue={newNumber} numberHandler={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons list={phonebookList()} handler={handleDelete}/>
    </div>
  )
}

export default App