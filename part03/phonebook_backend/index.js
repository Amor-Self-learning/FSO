const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');
const app = express();

app.use(express.static('dist'))
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
});

app.get('/api/info', (req, res) => {
  res.send(`<p>Phonebook has info of ${persons.length} people</p><p>${new Date().toString()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(note => {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end()
    }
  })
  .catch (e => {
    console.log(e.message);
    res.status(400).json({error: 'malformed id'});
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name && !body.number) {
    return res.status(400).json(({error: "name or number missing"}));
  } 
  Person.findOne({name : body.name}).then(person => {
    if (person) return res.status(400).json({error : 'name must be unique'})
    else {
      const person = new Person({
        name : body.name,
        number : body.number,
      })
      person.save().then(person =>
        res.json(person)
      )
    }
  });
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id);
  if (!person) {
    return res.status(404).json({error: `person with id ${id} not found`})
  }
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
})

const PORT = 3000;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);