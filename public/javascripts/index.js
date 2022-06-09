const selectCategory = document.querySelector("#select-category")
const selectRating = document.querySelector("#select-rating")

// set up the selected category option
if (selectCategory.dataset.value) {
  selectCategory.value = selectCategory.dataset.value
}
// set up the selected rating option
if (selectRating.dataset.value) {
  selectRating.value = selectRating.dataset.value
}