// packages and variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const methodOverride = require('method-override') 
const flash = require('connect-flash') 
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
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 60 * 60 * 24 // 24 hrs
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}))

// middleware: passport initialize and authenticate
usePassport(app)

// middleware: flash
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// middleware: routes
app.use(routes)

// start the server 
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})