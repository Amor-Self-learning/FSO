const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const pass = process.argv[2];

const url = `mongodb+srv://amorzephyr_db_user:${pass}@cluster0.ejc38o2.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false);

mongoose.connect(url, {family : 4});

const noteSchema = new mongoose.Schema({
  name : String, 
  number : String,
})

const Person = mongoose.model('Person', noteSchema);

if (process.argv.length === 3) {
  Person.find({}).then(result => {
  console.log('phonebook');
  result.forEach(person => {
    console.log(person.name, person.number)
})
  mongoose.connection.close()
})
} else if (process.argv.length >= 5) {
  const person = new Person({
    name : process.argv.slice(3, process.argv.length).join(' '),
    number : process.argv.at(-1),
  })
  person.save().then(result => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  })
}

// const note = new Note({
//   content : 'HTML is easy',
//   important : true
// })
// note.save().then(result => {
//   console.log('Note saved');
//   mongoose.connection.close();
// })