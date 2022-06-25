const router = require('express').Router()
const Restaurant = require('../../models/restaurant')
const options = require('../../options.json')

// router: get homepage
router.get('/', (req, res) => {
  const { sortingOptions, categoryOptions } = options

  Restaurant.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList, sortingOptions, categoryOptions }))
    .catch(e => console.log(e))
})

module.exports = router