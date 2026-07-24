const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

mongoose.connect(url, {family : 4})
  .then(results => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to Mongo DB', error.message);
  })

const personSchema = new mongoose.Schema({
  name : {
    type: String,
    minLength : 3
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(),
    delete returnedObject._id,
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema);