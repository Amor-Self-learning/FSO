import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/notes'
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = (props) => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState('A new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')

  useEffect (() => {
    noteService.getAll().then(initialValues => {
      setNotes(initialValues);
    })
  }, [])

  const toggleImportanceof = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important : !note.important};
    noteService.update(id, changedNote).then(
      returnedNote => setNotes(notes.map(note => note.id === id ? returnedNote : note))
    ).catch ( e => {
      setErrorMessage (`the note '${note.content}' was already deleted from server`);
      setTimeout(() => setErrorMessage(null), 5000);
      setNotes(notes.filter(n => n.id !== id));
    })
  }
  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important : Math.random() < 0.5
    };
    noteService.create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    })
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  if (!notes) return null;
  return (
    <div>
      <h1>Notes</h1>
      {errorMessage ? <Notification message={errorMessage}/> : '' }
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceof(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;
