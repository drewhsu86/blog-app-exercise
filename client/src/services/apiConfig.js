import axios from 'axios'


const apiURLs = {
  production: '',
  development: 'http://localhost:3000/api'
}

let apiURL

if (window.location.hostname === 'localhost') {
  apiURL = apiURLs.development
} else {
  apiURL = apiURLs.production
}

// axios create lets us use our own custom axios instance to call with
const api = axios.create({
  baseURL: apiURL
})

// export this and we can call axios using api in other components
export default api 