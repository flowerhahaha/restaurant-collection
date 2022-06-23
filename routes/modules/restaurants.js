const router = require('express').Router()
const Restaurant = require('../../models/restaurant')
const axios = require('axios')

// router: get new page
router.get('/new', (req, res) => {
  res.render('new')
})

// router: post a new restaurant
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

// router: get the show page
router.get('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(e => console.log(e))
})

// router: get the edit page
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(restaurantData => {
      res.render('edit', { restaurantData })
    })
})

// router: put the edited restaurant
router.put('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(e => console.log(e))
})

// router: delete the restaurant
router.delete('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

module.exports = router