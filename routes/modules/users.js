const router = require('express').Router()

// router: get user login page
router.get('/login', (req, res) => {
  res.render('login')
})

// router: get user register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router