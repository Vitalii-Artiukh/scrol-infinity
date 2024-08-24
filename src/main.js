import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchToPixabay } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';

const formSerched = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const preloader = document.querySelector('.preloader-wrap');
const moreBtn = document.querySelector('.js-load-more-btn');

let searchResault = '';
let numberPage = 1;
let quantityPages = 1;
let heightCard = 0;

const forRefresh = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 150,
});

const submitSearchPhoto = async event => {
  try {
    moreBtn.classList.add('is-visible');
    preloader.classList.remove('is-visible');
    event.preventDefault();
    numberPage = 1;

    searchResault = formSerched.elements.user_query.value;

    const response = await fetchToPixabay(searchResault, numberPage);

    quantityPages = response.data.totalHits / 15;

    gallery.innerHTML = '';
    formSerched.reset();

    if (response.data.hits.length === 0) {
      preloader.classList.add('is-visible');
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        maxWidth: '432px',
        messageColor: '#fafafb',
        messageSize: '16px',
        messageLineHeight: '150%',
      });
      return;
    }

    const photoCardsInfo = response.data.hits
      .map(details => createGalleryCard(details))
      .join('');

    gallery.innerHTML = photoCardsInfo;
    heightCard = document
      .querySelector('.gallery-card')
      .getBoundingClientRect();
  } catch (error) {
    iziToast.error({
      title: `${error}`,
      position: 'center',
      backgroundColor: '#ef4040',
    });
    formSerched.reset();
    preloader.classList.add('is-visible');
    return;
  }

  preloader.classList.add('is-visible');
  moreBtn.classList.remove('is-visible');
  forRefresh.refresh();
  numberPage += 1;

  if (Math.ceil(quantityPages) < numberPage) {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    moreBtn.classList.add('is-visible');
  }
};

const addMorePhoto = async event => {
  try {
    preloader.classList.remove('is-visible');

    const response = await fetchToPixabay(searchResault, numberPage);

    if (Math.ceil(quantityPages) >= numberPage) {
      const photoCardsInfo = response.data.hits
        .map(details => createGalleryCard(details))
        .join('');

      gallery.insertAdjacentHTML('beforeend', photoCardsInfo);
      window.scrollBy({
        top: heightCard.height * 2,
        behavior: 'smooth',
      });
    }
    moreBtn.classList.add('is-visible');

    forRefresh.refresh();

    preloader.classList.add('is-visible');
    moreBtn.classList.remove('is-visible');
    numberPage += 1;

    if (Math.ceil(quantityPages) < numberPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      moreBtn.classList.add('is-visible');
    }
  } catch (error) {
    iziToast.error({
      title: `${error}`,
      position: 'center',
      backgroundColor: '#ef4040',
    });
    preloader.classList.add('is-visible');
  }
};

formSerched.addEventListener('submit', submitSearchPhoto);
moreBtn.addEventListener('click', addMorePhoto);
