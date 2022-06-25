const router = require('express').Router()
const Restaurant = require('../../models/restaurant')
const options = require('../../options.json')

// router: get search result
router.get('/', (req, res) => {
  // if keyword is null, return undefined
  const keyword = req.query.keyword?.trim()
  const { sorting, category } = req.query
  const regExp = new RegExp(keyword, 'i')
  // if the selected category is 'All', use /./ to match any single character
  const categoryValue = category === 'All' ? /./ : category
  const { sortingOptions, categoryOptions } = options

  Restaurant
    .find({    
      $and: [
        { $or: [{ name: regExp }, { location: regExp }] },
        { category: categoryValue }
      ] 
    })
    .lean()
    .sort(sorting)
    .then(filteredData => res.render('index', { restaurantList: filteredData, keyword, sorting, category, sortingOptions, categoryOptions  }))
    .catch(e => console.log(e))
})

module.exports = router