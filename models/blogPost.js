const mongoose = require('mongoose')
const Schema = mongoose.Schema

// make a new schema and export it 
// constructor with 2 arguments
const BlogPost = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // object id requires valid object id of a certain type 
  author: { type: Schema.Types.ObjectId, required: false, ref: 'users' }
},
  {
    timestamps: true
  }
)

// remember to use mongoose.model(<collection name>,<schema>)
module.exports = mongoose.model('blogPosts', BlogPost)