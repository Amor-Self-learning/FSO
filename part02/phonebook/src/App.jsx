import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(true);

  const showMessage = (message, messageSuccess) => {
    setMessage(message);
    setMessageSuccess(messageSuccess);
    setTimeout(() => {
        setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    personService.getAll().then(
      allpersons => setPersons(allpersons)
    );
  }, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName) && 
      confirm(`${newName} is already added to phonebook, replace old number with new number?`)
    ) {
      const person = persons.find(person => person.name === newName);
      personService.update(person.id, {...person, number: newNumber}).then(
        () => {
          showMessage(`${person.name}'s number has been updated`, true);
        }
      ).catch(() => {
        showMessage(`information of ${newName} has already been removed from the server.`, false);
      }).finally(() => personService.getAll().then( allPersons => setPersons(allPersons))
      )
  }
  else {
        personService.create({name: newName, number : newNumber}
      ).then (
        person => {
          setPersons(persons.concat(person))
          showMessage(`Added ${person.name}`, true)
        }
      ).catch(error => showMessage(error.message, false))
    };
    setNewName('');
    setNewNumber('');
  };

  const deletePerson = person => {
    if(confirm(`Delete ${person.name}?`)) {
      personService.del(person.id).then (
        () => {
          showMessage(`Deleted ${person.name}`, true);
        }
      ).catch ( () => {
        showMessage(`information of ${person.name} has already been removed from the server.`, false);
      }).finally (() => {
        setPersons(persons.filter(p => p.id !== person.id));
      })
    }
  };

  if (!persons) return null;

  return (
    <>
    <h1>Phonebook</h1>
    {message && <Notification message={message} messageSuccess={messageSuccess}/>}
    <Filter filter={filter} setFilter={setFilter} />
    <h2>Add a new</h2>
    <PersonForm 
      newName={newName} 
      setNewName={setNewName} 
      newNumber={newNumber} 
      setNewNumber={setNewNumber} 
      addNewPerson={addNewPerson} 
    />
    <h2>Numbers</h2>
    <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </>
  )
}

export default App
