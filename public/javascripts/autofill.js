// add autocomplete input by google map api
const autocompleteInput = document.querySelector('#autocomplete')
const options = {
  types: ['establishment'],
  componentRestrictions: {'country' : ['TW']},
  fields: ['name', 'address_components']
}
const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, options)

// create a map object to call places service
const map = new google.maps.Map(document.getElementById("map"));
service = new google.maps.places.PlacesService(map);

// restaurant info autofilled by google API
const autofillBtn = document.querySelector('.btn-autofill')
autofillBtn.addEventListener('click', e => {
  e.preventDefault()
  // stop the function if input value is null
  if (!autocompleteInput.value.trim()) return

  // store the input value (address or name)
  const requestId = {
    query: autocompleteInput.value,
  }
  // get place_id by input value
  service.textSearch(requestId, results => {
    const requestDetails = {
      placeId: results[0].place_id,
      fields: ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'url', 'website']
    }
    // get place details by place_id
    service.getDetails(requestDetails, results => {
      document.querySelector('#name').value = results.name
      document.querySelector('#location').value = results.formatted_address
      document.querySelector('#phone').value = results.formatted_phone_number
      document.querySelector('#rating').value = results.rating
      document.querySelector('#googleMap').value = results.url
      document.querySelector('#description').innerText = results.website
    })
  })
})
