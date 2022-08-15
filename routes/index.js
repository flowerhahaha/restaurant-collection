const router = require('express').Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')

router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/users', users)

router.get('*', (req, res) => {
  res.status(404)
  res.render('404')
})

module.exports = router