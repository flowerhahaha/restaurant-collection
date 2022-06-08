// packages and variables
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
const app = express()

// set template engine: express-handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set middleware: static files
app.use(express.static('public'))

// set middleware: body-parser
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

// start and listen on the express server 
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})