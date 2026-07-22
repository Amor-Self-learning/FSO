import { useState, useEffect } from 'react';
import axios from 'axios';
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
        resp => {
          showMessage(`${person.name}'s number has been updated`, true);
        }
      ).catch(e => {
        showMessage(`information of ${newName} has already been removed from the server.`, false);
      }).finally(() => personService.getAll().then( allPersons => setPersons(allPersons))
      )
  }
  else {
        personService.create({name: newName, number : newNumber}
      ).then (
        person => {
          showMessage(`Added ${person.name}`, true)
          setPersons(persons.concat(person))
        }
      )
    };
    setNewName('');
    setNewNumber('');
  };

  const deletePerson = person => {
    if(confirm(`Delete ${person.name}?`)) {
      personService.del(person.id).then (
        resp => {
          showMessage(`Deleted ${person.name}`, true);
        }
      ).catch ( e => {
        showMessage(`information of ${person.name} has already been removed from the server.`, false);
      }).finally (() => {
        personService.getAll().then(allpersons => setPersons(allpersons));
      })
    }
  };

  if (!persons) return null;

  return (
    <>
    <h2>Phonebook</h2>
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
