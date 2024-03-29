const passport = require('passport')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const validator = require('validator')
const User = require('../../models/user')

// get user login page
router.get('/login', (req, res) => {
  res.render('login')
})

// post login information
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// get user register page
router.get('/register', (req, res) => {
  res.render('register')
})

// post register information to register an account
router.post('/register', async (req, res, next) => {
   try {
    let { name, email, password, confirmPassword } = req.body
    const errors = []
    // check if the register info is valid
    if (!email.trim() || !password || !confirmPassword) {
      errors.push({ message: 'Please fill in email, password, and confirm password fields.' })
    }
    if (!validator.isEmail(email)) {
      errors.push({ message: 'Email address is invalid.' })
    }
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[^]{8,20}$/
    if (!passwordReg.test(password)) {
      errors.push({ message: 'The password must be 8-20 characters long, contain letters and numbers.' })
      password = ''
      confirmPassword = ''
    }
    if (password !== confirmPassword) {
      errors.push({ message: 'The password confirmation does not match.' })
      confirmPassword = ''
    }
    if (errors.length) {
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    // check if the email already exists
    const isUserExisted = await User.exists({ email })
    if (isUserExisted) {
      errors.push({ message: 'User already exists!' })
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    // else store the user register information
    await User.create({ name, email, password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) })
    req.flash('success_msg', 'Register successfully! Please login to your account.')
    res.redirect('/users/login')
  } catch(e) {
    next(e)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logged out.')
  res.redirect('/users/login')
})

module.exports = router