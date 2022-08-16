const router = require('express').Router()
const Restaurant = require('../../models/restaurant')
const { sortingOptions, categoryOptions } = require('../../options.json')

// get search result
router.get('/', (req, res, next) => {
  // if keyword is null, return undefined
  const keyword = req.query.keyword?.trim()
  const { sorting, category } = req.query
  const regExp = new RegExp(keyword, 'i')
  // if the selected category is 'All', use /./ to match any single character
  const categoryValue = category === 'All' ? /./ : category

  Restaurant
    .find({    
      $and: [
        { $or: [{ name: regExp }, { location: regExp }] },
        { category: categoryValue },
        { userId: req.user._id }
      ] 
    })
    .lean()
    .sort(sorting)
    .then(filteredData => {
      if(!filteredData.length) {
        res.locals.danger_msg = '找不到符合條件的餐廳，請重新輸入'
      }
      res.render('index', { restaurantList: filteredData, keyword, sorting, category, sortingOptions, categoryOptions  })
    })
    .catch(e => next(e))
})

module.exports = router