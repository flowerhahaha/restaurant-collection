const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
	Restaurant.create(restaurantList)
		.then(() => console.log('The restaurant seed has been created.'))
		.catch(e => console.log(e))
		.finally(() => db.close())
})

