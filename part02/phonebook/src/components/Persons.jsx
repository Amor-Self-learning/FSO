const Persons = ({persons, filter, deletePerson}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    return (
      <div>
        {personsToShow.map(person => 
          <p key={person.id}>
            {person.name} {person.number} &nbsp;
            <button onClick={() => deletePerson(person)}>delete</button>
          </p>
        )}
      </div>
    )
}

export default Persons;