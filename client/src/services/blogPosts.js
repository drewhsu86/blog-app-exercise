import api from './apiConfig'

// functions that use the api axios wrapper 
// to do CRUD functions 

// GET all posts
export const getPosts = async () => {
  try {
    const response = await api.get('/posts')

    return response.data
  } catch (error) {
    throw (error)
  }
}

// GET one post 
export const getPost = async id => {
  try {
    const response = await api.get('/posts/' + id)

    return response.data
  } catch (error) {
    throw (error)
  }
}

// POST one post 
export const postPost = async post => {
  try {
    const response = await api.post('/posts', post)

    return response.data
  } catch (error) {
    throw (error)
  }
}

// PUT one post 
export const putPost = async (id, post) => {
  try {
    const response = await api.put('/posts/' + id, post)

    return response.data
  } catch (error) {
    throw (error)
  }
}

// DELETE one post 
export const deletePost = async id => {
  try {
    const response = await api.delete('/posts/' + id)

    return response.data
  } catch (error) {
    throw (error)
  }
}