const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://brunaweasley:${password}@cluster0.z1psjcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] === undefined){

  const person = Person
  .find({})
  .then(persons=> {
    console.log("phonebook")
    persons.map( item => {
      console.log(`${item.name} ${item.number}`)
    })
    mongoose.connection.close()
  })
 
} else {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}



