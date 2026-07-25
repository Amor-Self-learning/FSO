const Persons = ({persons, filter, deletePerson}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    return (
      <table className="all-persons">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {personsToShow.map(person => 
            <tr key={person.id} className="person">
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td><button onClick={() => deletePerson(person)}>delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    )
}

export default Persons;