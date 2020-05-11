const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const db = require('./db')

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', routes)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log('Listening to port ' + PORT) })