const express = require('express')
const bodyParser = require('bodyParser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())


const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log('Listening to port ' + PORT) })