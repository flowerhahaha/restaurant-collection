const router = require('express').Router()
const Restaurant = require('../../models/restaurant')
const options = require('../../options.json')

// get new page
router.get('/new', (req, res) => {
  const { categoryOptions } = options
  // remove 'all' option
  categoryOptions.shift()
  res.render('new', { categoryOptions })
})

// post a new restaurant
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

// get the show page
router.get('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(e => console.log(e))
})

// get the edit page
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  const { categoryOptions } = options
  // remove 'all' option
  categoryOptions.shift()

  Restaurant.findById(id)
    .lean()
    .then(restaurantData => {
      res.render('edit', { restaurantData, categoryOptions })
    })
})

// put the edited restaurant
router.put('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(e => console.log(e))
})

// delete the restaurant
router.delete('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

module.exports = router