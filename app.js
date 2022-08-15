// packages and variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
require('./config/mongoose')
const methodOverride = require('method-override') 
const routes = require('./routes')
const app = express()

// template engine: express-handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// middleware: static files, body-parser, method-override
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// middleware: session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// middleware: routes
app.use(routes)

// start the server 
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})