const { Router } = require('express')
const router = Router()
const controllers = require('../controllers')

router.get('/', (req, res) => res.send('This is root!'))
// get all posts 
router.get('/posts', (req, res) => controllers.getBlogPosts)

module.exports = router