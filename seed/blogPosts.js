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
