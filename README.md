# Full-Stack Blog Application
## Summary
Full-stack blog app that uses CRUD operations. 

## Installation
1. Create directory - mkdir <folder-name>
2. Initialize package.json for npm - npm init -y
3. Install Express things:
  * npm i express
  * npm i body-parser
  * npm i morgan
  * npm i mongoose
  * npm i nodemon 
  * npm i cors
4. Install React things:
  * Create react app into folder 'client' - npx create-react-app client 
  * cd client 
  * npm i 
  * npm i axios 
  * npm i react-router-dom
5. Create file structure for Express
  * Folders: db, models, routes, controllers, seed 
  * routes uses Router from express
  * __db__ connects to mongoDB database using mongoose
  * __controller__ has CRUD functions exported 
  * __models__ holds schemas for mongoDB database 
  * __seed__ adds initial values to database using __db__ and schemas
## Process 

#### Backend
1. Set up server.js to listen, and import body-parser, morgan and cors.

   ```js
    // setting up variables for server.js
    const express = require('express')
    const bodyParser = require('bodyParser')
    const morgan = require('morgan')
    const cors = require('cors')

    const app = express()
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(cors())

    // set up express app to listen 
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log('listening to port ' + PORT))
   ```
2. Set up database connection in db folder (mostly boilerplate).

  ```js
    // set up connection to mongodb url using mongoose 
    const mongoose = require('mongoose')

    // we specify the database name/variable here 
    let MONGODB_URI = process.env.BLOG_MONGODB || 'mongodb://127.0.0.1:27017/blogAppDatabase'

    // mongoose connection: boilerplate 
    mongoose
        .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log('Successfully connected to MongoDB.')
        })
        .catch(e => {
            console.error('Connection error', e.message)
        })

    // export the mongoose connection as db 
    const db = mongoose.connection

    module.exports = db
  ```

3. Set up a schema for our blog post database collection in the models folder.
* touch models/blogPosts.js
* Go to the file and require mongoose, then access mongoose.Schema

  ```js
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    // make a new schema and export it 
    // constructor with 2 arguments
    const BlogPost = new Schema({
      title: { type: String, required: true },
      content: { type: String, required: true },
      // object id requires valid object id of a certain type 
      // it has to be an id from the 'users' collections 
      author: { type: Schema.Types.ObjectId, required: false, ref: 'users' }
    },
      {
        timestamps: true
      }
    )

    // remember to use mongoose.model(<collection name>,<schema>)
    module.exports = mongoose.model('blogPosts', BlogPost)
  ```

4. Having one schema, we write a seed file to test with. This requires db and the schema we are testing. 

* touch seed/blogPosts.js

  ```js

      const db = require('../db')
      const BlogPost = require('../models/blogPost.js')

      // sort of boilerplate error checking method
      // for database connection to mongoDB
      db.on('error', console.error.bind(console, 'MongoDB connection error:'))

      // write a function that adds initial data to database 
      // we made author not required in the schema
      const main = async () => {
        // array of posts that have the right keys for our schema 
        const blogPosts = [
          {
            title: "Welcome to Blog App!",
            content: "This is an exercise in full stack development."
          },
          {
            title: "Intro to Blog App backend",
            content: "This blog uses a backend server that supports CRUD operations: GET POST PUT DELETE"
          },
          {
            title: "Intro to Blog App frontend",
            content: "This blog uses create-react-app. Looks great, right?"
          }
        ]

        // insertMany creates the table if it doesn't exist 
        await BlogPost.insertMany(blogPosts)
        console.log('Seeded initial blog posts!')
      }

      // call main (which is async) and close the database connection after (so after await main())
      const run = async () => {
        await main()
        db.close()
      }

  ```
