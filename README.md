# Full-Stack Blog Application

# Summary
The purpose of this app is to practice and record the steps to make a full-stack blog app that uses CRUD operations. The tech stack is Express, Mongodb and React. The focus is on how to create each step of the tech stack as well as connecting them as a RESTful app, so the styling of the app is highly neglected. The readme can be used by others to learn or remind them of the steps to instantiate each part of the app.

# Installation
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

# Process

## Backend 

### Backend - Setup and Structure
1. Set up server.js to listen, and import body-parser, morgan and cors. 

   ```js
    // setting up variables for server.js
    const express = require('express')
    const bodyParser = require('body-parser')
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
  Add the import and error catching to server.js
  ```js
    const db = require('./db')
    // ... 
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

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

      // run 'run'
      run()
  ```

### Backend - Test 
Run the seed file to see if the db runs on our computer.
* node seed/blogPosts.js
* Use MongoDB Compass to check (local) database.
  1. Download [MongoDB Compass](https://www.mongodb.com/products/compass) or use a tool you have.
  2. On MongoDB Compass connect to localhost (empty search bar does the same) and look for port 27017.
  3. See blogAppDatabase on the left, and the blogposts collection.
  4. See the blogposts made in the seed file with correct keys and values.

### Backend - Write Routes 
We need to write routes and then corresponding functions in the controller. We will test them after writing each one.

1. Create index.js in the routes directory and index.js in the controllers directory. 
* touch routes/index.js controllers/index.js

2. routes/index.js requires { Router } from express and our export from controllers.
  ```js
    const { Router } = require('express')
    const router = Router()
    const controllers = require('../controllers')

    // home route requires no controller 
    router.get('/', (req, res) => res.send('This is root!'))

    module.exports = router
  ```

3. controllers/index.js requires db and our schema, models/blogPost
  ```js
    const db = require('../db')
    const BlogPost = require('../models/blogPost')

    // include this every time db is used 
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

    // write functions here 

    module.exports = {
      // export using names of functions in this object
    }
  ```

4. Determine which routes required 
* Create blog post - POST /api/posts/
* View all blog posts (return array) - GET /api/posts/
* Read one blog post - GET /api/posts/:id
* Edit one blog post - PUT /api/posts/:id
* Delete one blog post - DELETE /api/posts/:id
Write these routes using router.get() or whichever CRUD request type (replacing '.get()').
(I won't be putting all the code as it is in the Github already)
Also, remember to remember all the __async__ __await__ for schema!

* Example route: get all products 
    * router request in routes 
    ```js
      // get all posts 
      // it doesn't say /api here because it will be in server.js
      router.get('/posts', (req, res) => controllers.getBlogPosts(req, res))
    ```
    * function in controllers (REMEMBER TO EXPORT IT)
    ```js
      // get all blog posts 
      async function getBlogPosts(req, res) {
      // do try catch to handle errors so server doesn't crash
        try {
          const blogPosts = await BlogPost.find()

          res.json(blogPosts)
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
      }
    ```
    * require routes and app.use in server.js 
    ```js
      // import routes (which is a Router from express)
      const routes = require('./routes')
      // ... skip down a bit 

      // we use the routes, with the additional prefix route '/api'
      app.use('/api', routes)
    ```
* Check http://localhost:3000/api 
 * "This is root!" -> It works!
    
## Frontend 

### Determine Layout and Basic Plan
Plan out some views or pages the React app will have. We will have app.js act as the router and have everything in a components folder. 
* App.js - router 
* nav - links to: view all posts, make new post 
* posts - show all posts as a list (just names)
* post/:id - show one post and content, also edit button
* post/edit/:id - show post with input/textarea, also save and delete buttons
* post/create - show empty input/textarea, also create button 
* services folder that exports the api url (wrapper for axios)

Because I am more concerned with functionality than optimization at the moment so I will write visual components and only include state where I need them.
* Will use useState (React hooks)
* Expected state requirements
  1. store api call for rerender 
  2. store input and textdata for put and delete 

