const PersonForm = ({newName, setNewName, newNumber, setNewNumber, addNewPerson}) => {
  return (
    <form onSubmit={addNewPerson}>
      <div className="input-div">
        <label htmlFor="name">Name: </label>
        <input id="name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
      </div>
      <div className="input-div">
        <label htmlFor="number">Number: </label>
        <input id="number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div className="input-div">
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default PersonForm;