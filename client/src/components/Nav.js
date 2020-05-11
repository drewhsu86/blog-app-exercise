import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div>
      <Link to="/">
        <h1>Blog App</h1>
      </Link>

      <Link to="/post/create">
        Make New Post
      </Link>
    </div>
  )
}
