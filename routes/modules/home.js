const router = require('express').Router()
const Restaurant = require('../../models/restaurant')

// router: get homepage
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(e => console.log(e))
})

module.exports = router