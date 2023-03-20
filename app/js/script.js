const swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})

let filteredNews = NEWS
let filterSort = 'all'

const filter = document.getElementById('newsFilter')
const filterText = document.getElementById('filterText')
const filterOption = document.querySelectorAll('.filter__list-item')

function chooseOption() {
  if (this.className.includes('active')) return
  filter.getElementsByClassName('active')[0].classList.remove('active')
  this.classList.add('active')
  filterSort = this.getAttribute('data-value')
  filterText.innerHTML = this.innerHTML

  switch (filterSort) {
    case 'today':
      filteredNews = NEWS.filter(
        el => new Date(el.date).getDate() === new Date().getDate()
      )
      break
    case 'yesterday':
      filteredNews = NEWS.filter(
        el => new Date(el.date).getDate() === new Date().getDate() - 1
      )
      break
    default:
      filteredNews = NEWS
  }

  showNews()
}

filterOption.forEach(function (el) {
  el.addEventListener('click', chooseOption)
})

// filterOption.map(el => el.addEventListener('click', chooseOption))

function convertDate(date) {
  const d = new Date(date)
  return `${String(d.getDate()).padStart(2, '0')}.${String(
    d.getMonth()
  ).padStart(2, '0')}.${d.getFullYear()}`
}

function showNews() {
  const newsList = document.getElementById('newsList')
  newsList.innerHTML = ''
  filteredNews.map(el => {
    const listItem = document.createElement('li')
    listItem.className = 'news__item'
    const item = `
      <a href="#" class="news__link">
      <div class="news__image">
      <img src="${el.img}" alt="${el.title}" />
      </div>

      <div class="news__date">${convertDate(el.date)}</div>
        <div class="news__title">${el.title}</div>
        <div class="news__text">${el.text}</div>
        </a>
      `

    listItem.innerHTML = item
    newsList.append(listItem)
  })
}

showNews()

const chooseBtns = document.querySelectorAll('.forms__btn')
const formsBtns = document.getElementById('formsBtns')
const formsText = document.getElementById('formsText')

function chooseForm() {
  if (this.className.includes('active')) return
  formsBtns.getElementsByClassName('active')[0].classList.remove('active')
  formsText.getElementsByClassName('active')[0].classList.remove('active')
  this.classList.add('active')
  formsText
    .getElementsByClassName('forms__text')
    [this.getAttribute('data-switch')].classList.add('active')
}

chooseBtns.forEach(function (el) {
  el.addEventListener('click', chooseForm)
})