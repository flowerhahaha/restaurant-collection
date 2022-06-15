const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurantList.forEach(data => {
    Restaurant.create({
      name: data.name,
			nameEn: data['name_en'],
			category: data.category,
			image: data.image,
			location: data.location,
			phone: data.phone,
			googleMap: data.google_map,
			rating: data.rating,
			description: data.description
    })
  })
  console.log('The restaurant seeder has been created.')
})

