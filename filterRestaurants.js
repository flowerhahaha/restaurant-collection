// filter restaurantList by name, category, and rating
function filterRestaurant (restaurantList, keyword, category, rating) {
  let filteredData = restaurantList.filter(data => data.name.toLowerCase().includes(keyword.trim().toLowerCase()))

  filteredData = rating === '0' ? filteredData : filteredData.filter(data => data.rating >= Number(rating))

  filteredData = category === 'All' ? filteredData : filteredData.filter(data => data.category === category)

  return filteredData
}

module.exports = filterRestaurant