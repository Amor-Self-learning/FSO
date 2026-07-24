const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(500).send({error: 'Malformatted Id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({error: error.message})
  }
  next(error)
}

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info of ${persons.length} people</p><p>${new Date().toString()}</p>`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch (error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name && !body.number) {
    return res.status(400).json(({error: 'name or number missing'}))
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
      ).catch(error => next(error))
    }
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(
      res.status(204).end()
    )
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const {name, number} = req.body
  Person.findById(req.params.id)
    .then( person => {
      if (!person) return res.status(404).end()
      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
        res.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)