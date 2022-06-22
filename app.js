// packages and variables
const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
require('./config/mongoose')
const methodOverride = require('method-override') 
const routes = require('./routes')
const app = express()

// template engine: express-handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// middleware: static files, body-parser, method-override, routes
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// start the server 
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})