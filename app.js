// packages and variables
const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
require('./config/mongoose')
const axios = require('axios')
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
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(e => console.log(e))
})

// router: delete restaurant
app.post('/restaurant/:id/delete', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
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

// router: get new page with restaurant info autofilled by google API 
app.get('/restaurants/new/autofill', (req, res) => {
  const address = encodeURI(req.query.address)
  const baseURL = 'https://maps.googleapis.com/maps/api/place'
  const fields = 'name,formatted_phone_number,formatted_address,rating,url,website'
  const configGetId = {
    method: 'get',
    url: `${baseURL}/findplacefromtext/json?input=${address}&inputtype=textquery&fields=place_id&key=${process.env.GOOGLE_MAP_API}`
  }

  axios(configGetId)
    .then(response => {
      const placeId = response.data.candidates[0].place_id
      const configGetDetail = {
        method: 'get',
        url: `${baseURL}/details/json?place_id=${placeId}&fields=${fields}&key=${process.env.GOOGLE_MAP_API}&language=zh-TW`
      }
      return axios(configGetDetail)
    })
    .then(response => res.render('new', {restaurantData: response.data.result}))
    .catch(error => console.log(error));
})

// start the server 
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})