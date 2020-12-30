const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'johnpw',
            entries: 0, // score
            joined: new Date()
        },
        {
            id: '124',
            name: 'pengsoo',
            email: 'pengsoo@gmail.com',
            password: 'pengpw',
            entries: 0, // score
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0])
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    database.users.push({
        id: "125", 
        name: name, 
        email: email, 
        password, password, 
        entries: 0, 
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    const found = false
    database.users.forEach(user => {
        if(user.id === id) {
            fount = true
            return res.json(user)
        }
    })
    if(!found) {
        return res.status(400).json('not found')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if(user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        }
    })
    if(!found) {
        return res.status(400).json('not found')
    }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.


app.listen(3001, () => { //listen 이후에 실행
    console.log('app is running on port 3001')
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user(object)
/profile/:userId --> GET = user(object)
/image --> PUT --> user
*/