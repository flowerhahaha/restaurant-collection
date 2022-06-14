// packages and variables
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
require('./config/mongoose')
const app = express()

// set template engine: express-handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set middleware: static files, body-parser
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// set router: get homepage
app.get('/', (req, res) => {
  res.render('index', { restaurantList })
})

// set router: get show page
app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params
  const restaurantData = restaurantList.find(data => data.id === Number(id))
  res.render('show', { restaurantData })
})

// set router: get search result
app.get('/search', (req, res) => {
  const { keyword } = req.query
  const word = keyword.trim().toLowerCase()
  const filteredData = restaurantList.filter(data => 
    data.name.toLowerCase().includes(word) || 
    data.category.toLowerCase().includes(word)
  )
  const notFound = filteredData.length ? false : true
  res.render('index', { restaurantList: filteredData, keyword: keyword.trim(), notFound })
}) 

// start the server 
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})