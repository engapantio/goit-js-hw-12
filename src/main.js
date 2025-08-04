import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import * as rendered from './js/render-functions';

const closeSVGLink = new URL('./img/x-octagon.svg', import.meta.url).href;
const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.js-load-more');
let meaning = '';
let page = 2;

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  meaning = searchForm.elements['search-text'].value.trim();
  if (meaning === '') {
    iziToast.warning({
      backgroundColor: 'orange',
      message:
        'Sorry, there is nothing provided here to look for. Please try again!',
      messageColor: '#fafafa',
      messageSize: '16px',
      messageLineHeight: 1.5,
      position: 'topLeft',
    });
    return;
  }

  rendered.clearGallery();
  rendered.showLoader();

  getImagesByQuery(meaning)
    .then(data => {
      rendered.hideLoader();
      searchForm.elements['search-text'].value = '';
      if (data.hits.length === 0) {
        iziToast.error({
          backgroundColor: '#ef4040',
          class: 'error-message',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: 1.5,
          position: 'topRight',
          iconUrl: closeSVGLink,
        });

        return;
      }

      rendered.createGallery(data.hits);
      if (
        document.querySelector('ul.gallery').innerHTML &&
        Math.ceil(data.totalHits / 15) !== page
      ) {
        rendered.showLoadMoreButton();
      }
    })
    .catch(error => {
      console.error(error);
    });
});

loadMoreBtn.addEventListener('click', () => {
  rendered.showLoadMoreButton();
  rendered.showLoader();
  getImagesByQuery(meaning, page)
    .then(data => {
      rendered.hideLoader();
      console.log(data.totalHits, page);
      if (Math.ceil(data.totalHits / 15) < page) {
        page = 2;
        meaning = '';
        rendered.hideLoadMoreButton();
      }

      rendered.createGallery(data.hits);
    })
    .catch(err => {
      console.log(err);
    });

  if (meaning) {
    page++;
  }
});

/*
У файлі main.js напиши всю логіку роботи додатка. Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді робимо саме в цьому файлі. Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.
Користувач буде вводити рядок для пошуку в текстове поле, а за сабмітом форми необхідно виконувати HTTP-запит із цим пошуковим рядком.





При натисканні на кнопку відправки форми, додайте перевірку вмісту текстового поля на наявність порожнього рядка, щоб користувач не міг відправити запит, якщо поле пошуку порожнє.

Для показу повідомлень використовуй бібліотеку iziToast.


Галерея і картки зображень

Елемент галереї (список однотипних елементів <ul class=”gallery”>) уже має бути в HTML-документі. Після виконання HTTP-запитів у нього потрібно додавати розмітку карток зображень.

Індикатор завантаження

Додай елемент для сповіщення користувача про процес завантаження зображень із бекенду. Завантажувач має з’являтися перед початком HTTP-запиту та зникати після його завершення.



Кінець колекції



У відповіді бекенд повертає властивість totalHits — загальна кількість зображень, які відповідають критерію пошуку (для безкоштовного акаунту). Якщо користувач дійшов до кінця колекції, ховай кнопку Load more і виводь повідомлення з наступним текстом.

We're sorry, but you've reached the end of search results.



Зверни увагу, що кінець колекції може бути і на 1й сторінці, і на подальших.


Прокручування сторінки



Зроби плавне прокручування сторінки після запиту і відтворення кожної наступної групи зображень. Для цього отримай у коді висоту однієї карточки галереї, використовуючи функцію getBoundingClientRect. Після цього використовуй метод window.scrollBy для прокрутки сторінки на дві висоти карточки галереї.

*/
