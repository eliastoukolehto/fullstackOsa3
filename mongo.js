const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('Include password')
    process.exit(1)
}


const password = process.argv[2]

const url = `mongodb+srv://eliastoukolehto:${password}@cluster0.ukk0e.mongodb.net/Puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<5) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
        //console.log('goodbye')
    })} else {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}


