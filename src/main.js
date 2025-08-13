import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'modern-normalize/modern-normalize.css';
import getImagesByQuery from './js/pixabay-api';
import * as rendered from './js/render-functions';

const closeSVGLink = new URL('./img/x-octagon.svg', import.meta.url).href;
const searchForm = document.querySelector('form.form');
const loadMoreBtn = document.querySelector('button.js-load-more');
const perPage = 15;
let totalPages = NaN;
let queryText = '';
let page;
let loadMoreQueryText;

// initiate search, fixing query value to global var(s)
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  queryText = searchForm.elements['search-text'].value.trim();
  if (queryText !== '') loadMoreQueryText = queryText.slice();
  if (queryText === '') {
    return iziToast.warning({
      backgroundColor: 'orange',
      message:
        'Sorry, there is nothing provided here to look for. Please try again!',
      messageColor: '#fafafa',
      messageSize: '16px',
      messageLineHeight: 1.5,
      position: 'topLeft',
    });
  }

  rendered.hideLoadMoreButton();
  rendered.clearGallery();
  rendered.showLoader();
  page = 1;

  try {
    getImagesByQuery(queryText, page).then(queriedImages => {
      totalPages = Math.ceil(queriedImages.totalHits / perPage);
      rendered.hideLoader();
      searchForm.elements['search-text'].value = '';

      if (queriedImages.hits.length === 0) {
        return iziToast.error({
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
      }

      rendered.createGallery(queriedImages.hits);

      if (document.querySelector('ul.gallery').innerHTML && totalPages > 1) {
        rendered.showLoadMoreButton();
      } else if (totalPages === 1) {
        iziToast.error({
          backgroundColor: '#ef4040',
          class: 'error-message',
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: 1.5,
          position: 'bottomRight',
          iconUrl: closeSVGLink,
        });
      }
    });
  } catch (error) {
    rendered.hideLoader();
    iziToast.error({
      backgroundColor: '#380505ff',
      message: `${error}`,
      messageColor: '#fff',
    });
  }
});

//working with Load More button (pages 2 and following);
loadMoreBtn.addEventListener('click', async () => {
  page++;
  rendered.hideLoadMoreButton();
  rendered.showLoader();

  try {
    getImagesByQuery(loadMoreQueryText, page).then(moreImagesLoaded => {
      totalPages = Math.ceil(moreImagesLoaded.totalHits / perPage);
      rendered.hideLoader();
      rendered.hideLoadMoreButton();

      if (totalPages <= page) {
        queryText = '';
        totalPages = NaN;
        iziToast.error({
          backgroundColor: '#ef4040',
          class: 'error-message',
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: '#fff',
          messageSize: '16px',
          messageLineHeight: 1.5,
          position: 'bottomRight',
          iconUrl: closeSVGLink,
        });
      } else {
        rendered.showLoadMoreButton();
      }
      rendered.createGallery(moreImagesLoaded.hits);
      window.scrollBy({
        top:
          2 *
          document.querySelector('li.gallery-item').getBoundingClientRect()
            .height,
        left: 0,
        behavior: 'smooth',
      });
    });
  } catch (error) {
    rendered.hideLoader();
    iziToast.error({
      backgroundColor: '#380505ff',
      message: `${error}`,
      messageColor: '#fff',
    });
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


Поки в галерії нема зображень, кнопка повинна бути прихована.
Після того як у галереї з'являються зображення, кнопка з'являється в інтерфейсі під галереєю.
При повторному сабміті форми кнопка спочатку ховається, а після отримання результатів запиту знову відображається за потреби.
Перенеси індикатор завантаження під кнопку завантаження додаткових зображень.

*/
