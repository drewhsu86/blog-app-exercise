const { Router } = require('express')
const router = Router()
const controllers = require('../controllers')

router.get('/', (req, res) => res.send('This is root!'))
// get all posts 
router.get('/posts', (req, res) => controllers.getBlogPosts(req, res))
// get one post 
router.get('/posts/:id', (req, res) => controllers.getBlogPost(req, res))
// post one post 
router.post('/posts', (req, res) => controllers.postBlogPost(req, res))
// put one post 
router.put('/posts/:id', (req, res) => controllers.putBlogPost(req, res))
// delete one post 
router.delete('/posts/:id', (req, res) => controllers.deleteBlogPost(req, res))

module.exports = router