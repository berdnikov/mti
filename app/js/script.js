const swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    type: window.innerWidth > 1385 ? 'fraction' : 'bullets',
    clickable: true
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

const chooseBtns = document.querySelectorAll('.study__btn')
const studyText = document.getElementById('studyText')

function chooseForm() {
  if (this.className.includes('active')) {
    if (window.innerWidth > 1385) return
    this.classList.remove('active')
    studyText
      .getElementsByClassName('study__text active')[0]
      .classList.remove('active')
  }
  if (studyText.getElementsByClassName('study__text active')[0]) {
    Array.from(chooseBtns)
      .filter(btn => btn.className.includes('active'))
      .map(btn => btn.classList.remove('active'))
    studyText.getElementsByClassName('active')[0].classList.remove('active')
  }
  this.classList.add('active')
  studyText
    .getElementsByClassName('study__text')
    [this.getAttribute('data-switch')].classList.add('active')
}

chooseBtns.forEach(function (el) {
  el.addEventListener('click', chooseForm)
})

const faq = document.querySelectorAll('.faq__block')

function toggleFaq() {
  this.className.includes('active')
    ? this.classList.remove('active')
    : this.classList.add('active')
}

faq.forEach(function (el) {
  el.addEventListener('click', toggleFaq)
})

if (window.innerWidth < 1386) {
  studyText
    .getElementsByClassName('study__text active active')[0]
    .classList.remove('active')
  Array.from(chooseBtns)
    .filter(btn => btn.className.includes('active'))
    .map(btn => btn.classList.remove('active'))
}

const menu = document.getElementById('menu')
const menuBtn = document.getElementById('menuBtn')

menuBtn.addEventListener('click', function () {
  menu.className.includes('active')
    ? menu.classList.remove('active')
    : menu.classList.add('active')
})
