// maintain scroll position after form submit
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('myRestaurant') !== null) {
    window.scrollTo({
      top: localStorage.getItem('myRestaurant'),
      behavior: "smooth"
    })
  }
})

// store scroll position
document.addEventListener('scroll', function() {
  localStorage.setItem('myRestaurant', window.pageYOffset)
})

// alert to confirm the deletion
const cards = document.querySelector('.restaurant-cards')
cards.addEventListener('click', e => {
  if (!(e.target.matches('.btn-delete') || e.target.matches('.fa-trash-can'))) return
  e.preventDefault()
  swal({
    title: "確定刪除資料?",
    icon: "warning",
    text: "刪除的資料無法恢復",
    buttons: true,
    dangerMode: true
  }).then(check => {
    if(check) {
      const id = e.target.dataset.id
      document.querySelector(`.form-${id}`).submit()
    }
  })
})
