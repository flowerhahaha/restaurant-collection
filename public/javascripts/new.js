const backBtn = document.querySelector('.btn-back')
const saveBtn = document.querySelector('.btn-save')
const form = document.querySelector('.details-form')

// add autocomplete input by google map api
if (document.querySelector('#autocomplete')) {
  const autocompleteInput = document.querySelector('#autocomplete')
  const options = {
    types: ['establishment'],
    componentRestrictions: {'country' : ['TW']},
    fields: ['name', 'address_components']
  }
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, options)
}

// add bootstrap form validation
saveBtn.addEventListener('click', function onSubmitButtonClicked(event) {
  form.classList.add('was-validated')
})

 // add 'back to homepage' alert
backBtn.addEventListener("click", e => {
  e.preventDefault()
  swal({
    title: "確定返回首頁?",
    icon: "warning",
    text: "尚未儲存的資料離開頁面後將會消失",
    buttons: true,
    dangerMode: true
  }).then(check => {
    if(check) {
      window.location = 'http://localhost:3000/'
    }
  })
})