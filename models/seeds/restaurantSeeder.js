if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('./restaurantList.json').restaurants
const userList = require('./userList.json').users
const db = require('../../config/mongoose')

db.once('open', () => {	
	Promise
		.all(userList.map(user => {
			const { name, email, password, restaurantIndexes } = user
			// create seed user
			return User.create(
				{
					name, 
					email, 
					password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) 
				})
				.then(user => {
					// store the user's restaurants
					const restaurants = restaurantIndexes.map(index => {
						const restaurant = restaurantList[index]
						restaurant.userId = user._id
						return restaurant
					})
					// create seed restaurants for the user
					return Restaurant.create(restaurants)
				})
		}))
		.then(() => console.log('The user and restaurant seeds have been created.'))
		.catch(e => console.log(e))
		.finally(() => db.close())
})

