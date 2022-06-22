const router = require('express').Router()
const Restaurant = require('../../models/restaurant')

// router: get search result
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  const regExp = new RegExp(keyword, 'i')
  Restaurant
    .find({ $or: [{ name: regExp }, { category: regExp }] })
    .lean()
    .then(filteredData => {
      const notFound = filteredData.length ? false : true
      res.render('index', { restaurantList: filteredData, keyword, notFound })
    })
    .catch(e => console.log(e))
})

module.exports = router