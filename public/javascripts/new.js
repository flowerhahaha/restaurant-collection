const backBtn = document.querySelector('.btn-back')

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