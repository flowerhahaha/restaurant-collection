const router = require('express').Router()
const Restaurant = require('../../models/restaurant') 
const categoryOptions = require('../../options.json').categoryOptions.slice(1) // remove 'all' option

// get new page
router.get('/new', (req, res) => {
  res.render('new', { categoryOptions })
})

// post a new restaurant
router.post('/', (req, res, next) => {
  const userId = req.user._id

  Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(e => next(e))
})

// get the show details page
router.get('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(e => next(e))
})

// get the edit page
router.get('/:id/edit', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData, categoryOptions }))
    .catch(e => next(e))
})

// put the edited restaurant
router.put('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(e => next(e))
})

// delete the restaurant
router.delete('/:id', (req, res, next) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(e => next(e))
})

module.exports = router