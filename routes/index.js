const router = require('express').Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/auth', auth)
router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/', authenticator, home)

// get 404 error page 
router.get('*', (req, res) => {
  res.locals.danger_msg = 'The requested URL was not found on this server'
  res.status(404).render('error')
})

// 500 error handling
router.use((err, req, res, next) => {
  res.locals.danger_msg = 'Sorry! Server is broken. We will fix it soon.'
  console.log(err)
  res.status(500).render('error')
})

module.exports = router