const router = require('express').Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/', authenticator, home)

router.get('*', (req, res) => {
  res.status(404)
  res.render('404')
})

module.exports = router