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

export function showLoadMoreButton() {
  document.querySelector('.js-load-more').classList.add('load-more-btn');
}

export function hideLoadMoreButton() {
  document.querySelector('.js-load-more').classList.remove('load-more-btn');
}

// Перед пошуком за новим ключовим словом необхідно повністю очищати вміст галереї, щоб не змішувати результати запитів.

/*
У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
showLoadMoreButton(). Ця функція нічого не приймає, повинна додавати клас для відображення кнопки Load more. Нічого не повертає.
hideLoadMoreButton(). Ця функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more. Нічого не повертає.


Бібліотека SimpleLightbox



Додай відображення великої версії зображення з бібліотекою SimpleLightbox для повноцінної галереї.


У розмітці необхідно буде обгорнути кожну картку зображення в посилання, як зазначено в документації в секції Markup.
Бібліотека містить метод refresh(), який обов'язково потрібно викликати щоразу після додавання нових елементів до галереї.


Робота модального вікна пов'язана з самою галереєю, тому використання бібліотеки SimpleLightbox і методу екземпляру refresh() буде доцільним у файлі render-functions.js.


Додай в HTML-документі після галереї розмітку кнопки з текстом Load more, за кліком на яку необхідно виконувати запит за наступною групою зображень і додавати розмітку до вже існуючих елементів галереї. Для цього при сабміті форми тобі необхідно зберігати те, що ввів користувач у глобальну змінну.



Поки в галерії нема зображень, кнопка повинна бути прихована.
Після того як у галереї з'являються зображення, кнопка з'являється в інтерфейсі під галереєю.
При повторному сабміті форми кнопка спочатку ховається, а після отримання результатів запиту знову відображається за потреби.
Перенеси індикатор завантаження під кнопку завантаження додаткових зображень.






На що буде звертати увагу ментор при перевірці:



Домашня робота містить два посилання: на вихідні файли і живу сторінку на GitHub Pages
Проєкт зібраний за допомогою Vite
Консоль в інструментах розробника не містить помилок, попереджень і консоль логів
Елементи на сторінці стилізовані згідно з макетом (або власні стилі)
Проєкт містить код із попередньої ДЗ
У файлі pixabay-api.js є функція getImagesByQuery(query, page) для виконання HTTP-запитів
У файлі render-functions.js створено екземпляр SimpleLightbox та є функції для відображення елементів інтерфейсу: createGallery(images), clearGallery(), showLoader(), hideLoader(), showLoadMoreButton(), hideLoadMoreButton()
У файлі main.js описана вся логіка роботи додатку
Усі асинхронні запити відрефакторені і реалізовані за допомогою синтаксиса async/await
За один запит у відповідь приходить 15 елементів
Нові зображення додаються в DOM за одну операцію
На сторінці під галереєю міститься кнопка Load more, при кліку на яку відправляється запит на наступну сторінку
Після додавання нових елементів до списку зображень на екземплярі SimpleLightbox викликається метод refresh()
Коли користувач отримує результати за максимально можливою сторінкою для конкретного пошукового слова, тобто вже немає чого підвантажувати, кнопка Load more зникає і з’являється відповідне повідомлення
При кожному новому сабміті форми номер сторінки скидається до дефолтного 1 і результати попередніх запитів зникають
При кліку на маленьке зображення в галереї відкривається його збільшена версія у модальному вікні з використанням бібліотеки SimpleLightbox

*/
