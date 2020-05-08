const db = require('../db')
const BlogPost = require('../models/blogPost')

// include this every time db is used 
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// write functions here 
// they all take req, res as arguments from router 

// get all blog posts 
function getBlogPosts(req, res) {
  // do try catch to handle errors so server doesn't crash
  try {
    const blogPosts = BlogPost.find()

    res.json(blogPosts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  // export using names of functions in this object
}