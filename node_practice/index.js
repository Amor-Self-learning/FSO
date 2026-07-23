const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(note => note.id === id)
  note ? res.json(note) : res.status(404).end();
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = notes.filter(note => note.id !== id);
  res.status(204).end();
})

const generateId = () => {
   const maxId = notes.length > 0 
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0;
  return String(maxId + 1);
}

app.post('/api/notes/', (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json(({error: "content missing"}));
  }
  const note = {
    content : req.body.content,
    important : req.body.important || false,
    id : generateId(),
  }
  notes = notes.concat(note);
  res.json(note);
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`)