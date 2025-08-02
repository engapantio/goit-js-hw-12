import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createGallery(images) {
  const markup = images
    .map(
      image => `<li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
        <ul class="photo-details">
          <li>
            <p>Likes</p>
            <p>${image.likes}</p>
          </li>
          <li>
            <p>Views</p>
            <p>${image.views}</p>
          </li>
          <li>
            <p>Comments</p>
            <p>${image.comments}</p>
          </li>
          <li>
            <p>Downloads</p>
            <p>${image.downloads}</p>
          </li>
        </ul>
      </a>
    </li>`
    )
    .join('');

  document.querySelector('ul.gallery').innerHTML = markup;

  const galleryItemLarge = new SimpleLightbox('.gallery a', {
    animationSpeed: 350,
    captionsData: 'alt',
    captionDelay: 150,
    rtl: true,
    widthRatio: 0.9,
  });

  galleryItemLarge.refresh();
}

export function clearGallery() {
  document.querySelector('ul.gallery').innerHTML = '';
}

export function showLoader() {
  document.querySelector('.js-loader').classList.add('loader');
}

export function hideLoader() {
  document.querySelector('.js-loader').classList.remove('loader');
}

// Перед пошуком за новим ключовим словом необхідно повністю очищати вміст галереї, щоб не змішувати результати запитів.

/*
У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.



Бібліотека SimpleLightbox



Додай відображення великої версії зображення з бібліотекою SimpleLightbox для повноцінної галереї.


У розмітці необхідно буде обгорнути кожну картку зображення в посилання, як зазначено в документації в секції Markup.
Бібліотека містить метод refresh(), який обов'язково потрібно викликати щоразу після додавання нових елементів до галереї.


Робота модального вікна пов'язана з самою галереєю, тому використання бібліотеки SimpleLightbox і методу екземпляру refresh() буде доцільним у файлі render-functions.js.


На що буде звертати увагу ментор при перевірці:

Домашня робота містить два посилання: на вихідні файли і живу сторінку на GitHub Pages
Проєкт зібраний за допомогою Vite
Консоль в інструментах розробника не містить помилок, попереджень і консоль логів
До проєкту підключені бібліотеки iziToast, SimpleLightbox та css-loader
Елементи на сторінці стилізовані згідно з макетом (або власні стилі)
У файлі  pixabay-api.js є функція getImagesByQuery(query) для виконання HTTP-запитів
У файлі render-functions.js створено екземпляр SimpleLightbox та є функції для відображення елементів інтерфейсу: createGallery(images), clearGallery(),  showLoader(),  hideLoader()
У файлі main.js описана вся логіка роботи додатку
На сторінці присутня форма пошуку зображень за пошуковим словом
При сабміті форми перед відправкою запиту на бекенд з’являється індикатор завантаження з css-loader та очищаються попередні результати пошуку на сторінці
При сабміті форми відправляється запит на бекенд по ключовому слову для пошуку зображень з усіма параметрами, що вказані в ТЗ
Після отримання відповіді від бекенда зникає індикатор завантаження та на сторінці відмальовуються зображення на основі отриманих даних від бекенду, або з’являється повідомлення про те, що підходящих результатів не було знайдено
Нові зображення додаються в DOM за одну операцію
Після додавання нових елементів до списку зображень на екземплярі SimpleLightbox викликається метод refresh()
При кліку на маленьке зображення в галереї відкривається його збільшена версія у модальному вікні з використанням бібліотеки SimpleLightbox
Під час виконання HTTP-запитів використовуються обробники then() та catch(), щоб опрацьовувати можливі помилки та запобігти “падінню” сторінки

*/
