import React, { useState, useEffect } from 'react'
import { getPosts } from '../services/blogPosts'
import { Link } from 'react-router-dom'

export default function Posts() {

  const [blogPosts, updBlogPosts] = useState([])

  const apiCall = async () => {
    const pullPosts = await getPosts()
    updBlogPosts(pullPosts)
  }

  useEffect(() => {
    apiCall()
  }, [])

  return (
    <div>
      {
        blogPosts.map((post) => {
          return (
            <Link to={"/post/" + post['_id']}>
              <h1>{post.title}</h1>
            </Link>
          )
        })
      }
    </div >
  )
}
