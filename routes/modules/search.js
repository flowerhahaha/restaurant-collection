const router = require('express').Router()
const Restaurant = require('../../models/restaurant')

// router: get search result
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  const { sorting, category } = req.query
  const regExp = new RegExp(keyword, 'i')
  categoryValue = category === 'All' ? /./ : category

  Restaurant
    .find({ $or: [{ name: regExp }, { location: regExp }] })
    .find({ category: categoryValue })
    .lean()
    .sort(sorting)
    .then(filteredData => res.render('index', { restaurantList: filteredData, keyword, sorting, category }))
    .catch(e => console.log(e))
})

module.exports = router