const router = require('express').Router()
const Restaurant = require('../../models/restaurant')
const axios = require('axios')

// router: get new page
router.get('/new', (req, res) => {
  res.render('new')
})

// router: post new restaurant
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

// router: get show page
router.get('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(e => console.log(e))
})

// router: get edit page
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(restaurantData => {
      res.render('edit', { restaurantData })
    })
})

// router: post edited restaurant
router.put('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(e => console.log(e))
})

// router: delete restaurant
router.delete('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

// router: get new page with restaurant info autofilled by google map API 
router.get('/new/autofill', (req, res) => {
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

module.exports = router