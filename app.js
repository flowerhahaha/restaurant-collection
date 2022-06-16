// packages and variables
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
const Restaurant = require('./models/restaurant')
require('./config/mongoose')
const app = express()

// template engine: express-handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// middleware: static files, body-parser
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// router: get homepage
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(e => console.log(e))
})

// router: get new page
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// router: post new restaurant
app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

// router: get show page
app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(e => console.log(e))
})

// router: get edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(restaurantData => {
      res.render('edit', { restaurantData })
    })
})

// router: post edited restaurant
app.post('/restaurants/:id/edit', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndUpdate(id, req.body, { new: true })
    .then(restaurantData => restaurantData.save())
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(e => console.log(e))
})

// router: get search result
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const regExp = new RegExp(keyword, 'gi')
  Restaurant
    .find({ $or: [{ name: regExp }, { category: regExp }] })
    .lean()
    .then(filteredData => {
      const notFound = filteredData.length ? false : true
      res.render('index', { restaurantList: filteredData, keyword, notFound })
    })
    .catch(e => console.log(e))
})

// start the server 
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})