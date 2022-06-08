// packages and variables
const express = require('express')
const exphbs = require('express-handlebars')
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
  res.render('show')
})

// start and listen on the express server 
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})