const router = require('express').Router()
const Restaurant = require('../../models/restaurant')
const { sortingOptions, categoryOptions } = require('../../options.json')

// get homepage
router.get('/', (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .lean()
    .then(restaurantList => {
      if (!restaurantList.length) {
        res.locals.danger_msg = '無餐廳資料，請新增餐廳'
      }
      res.render('index', { restaurantList, sortingOptions, categoryOptions })
     })
    .catch(e => console.log(e))
})

module.exports = router