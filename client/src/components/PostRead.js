import React, { useState, useEffect } from 'react'
import { getPost } from '../services/blogPosts'
import { useParams } from 'react-router-dom'

export default function PostRead() {

  const [blogPost, updBlogPost] = useState(null)
  const id = useParams()['id']

  const apiCall = async (id) => {
    const pullPost = await getPost(id)
    updBlogPost(pullPost)
  }

  useEffect(() => {
    apiCall(id)
  }, [])

  if (blogPost) {
    return (
      <div>
        <h1>{blogPost.title}</h1>
        <p>
          {blogPost.content}
        </p>
      </div>
    )
  } else {
    return null
  }
}
