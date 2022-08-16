const router = require('express').Router()
const Restaurant = require('../../models/restaurant') 

// get new page
router.get('/new', (req, res) => {
  // remove 'all' option
  const categoryOptions = require('../../options.json').categoryOptions.slice(1)

  res.render('new', { categoryOptions })
})

// post a new restaurant
router.post('/', (req, res) => {
  const userId = req.user._id

  Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

// get the show details page
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(e => console.log(e))
})

// get the edit page
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  // remove 'all' option
  const categoryOptions = require('../../options.json').categoryOptions.slice(1)

  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData, categoryOptions }))
    .catch(e => console.log(e))
})

// put the edited restaurant
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(e => console.log(e))
})

// delete the restaurant
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

module.exports = router