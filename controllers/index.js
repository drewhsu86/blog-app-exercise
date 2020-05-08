const db = require('../db')
const BlogPost = require('../models/blogPost')

// include this every time db is used 
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// write functions here 
// they all take req, res as arguments from router 

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

// get one blog post
async function getBlogPost(req, res) {
  // do try catch to handle errors so server doesn't crash
  try {
    // in routes, path is /posts/:id
    const blogPost = await BlogPost.findById(req.params.id)

    res.json(blogPost)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get one blog post
async function postBlogPost(req, res) {
  // do try catch to handle errors so server doesn't crash
  try {
    // in routes, path is /posts/:id
    const blogPost = await new BlogPost(req.body)

    // .save() to be run on instance not class
    await blogPost.save()

    res.json(blogPost)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get one blog post
async function putBlogPost(req, res) {
  // do try catch to handle errors so server doesn't crash
  try {
    // in routes, path is /posts/:id
    // check mongoose docs for findByIdAndUpdate
    await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, blogPost) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found!' })
      }
      // seems like the mongoose will do spread operator for us
      res.status(200).json(blogPost)
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get one blog post
async function deleteBlogPost(req, res) {
  // do try catch to handle errors so server doesn't crash
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id)
    // determine if delete successful to send back a message
    if (deleted) {
      return res.status(200).send("Blog post deleted")
    }
    throw new Error("Blog post not found")
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  // export using names of functions in this object
  getBlogPosts,
  getBlogPost,
  postBlogPost,
  putBlogPost,
  deleteBlogPost
}