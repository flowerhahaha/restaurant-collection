const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stringType = {
  type: String,
  required: true,
  trim: true
}

const restaurantSchema = new Schema ({
  name: stringType,
  nameEn: {
    type: String,
    trim: true
  },
  category: stringType,
  image: stringType,
	location: stringType,
	phone: stringType,
	googleMap: stringType,
	rating: {
		type: Number,
		required: true,
    min: 0,
    max: 5
	},
	description: stringType,
})

module.exports = mongoose.model('Restaurant', restaurantSchema)