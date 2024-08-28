import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchToPixabay } from './js/pixabay-api';
import { createGalleryCard } from './js/render-functions';

const formSerched = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const preloader = document.querySelector('.preloader-wrap');
const scrollMarkerEl = document.querySelector('.js-scroll-infinity');
const goTopBtn = document.querySelector('.js-go-top');

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
    observer.observe(scrollMarkerEl);
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
  forRefresh.refresh();
  numberPage += 1;
};

const scrollObserverOptions = {
  root: null,
  rootMargin: '0px 0px 400px 0px',
  threshold: 1,
};

const observeMorePhoto = async scrolling => {
  console.log(scrolling);
  if (scrolling[0].isIntersecting) {
    try {
      const response = await fetchToPixabay(searchResault, numberPage);

      if (Math.ceil(quantityPages) >= numberPage) {
        const photoCardsInfo = response.data.hits
          .map(details => createGalleryCard(details))
          .join('');

        gallery.insertAdjacentHTML('beforeend', photoCardsInfo);
      }

      forRefresh.refresh();

      numberPage += 1;

      if (Math.ceil(quantityPages) < numberPage) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } catch (error) {
      iziToast.error({
        title: `${error}`,
        position: 'center',
        backgroundColor: '#ef4040',
      });
    }
  }
};

const observer = new IntersectionObserver(
  observeMorePhoto,
  scrollObserverOptions
);

formSerched.addEventListener('submit', submitSearchPhoto);

const goTop = () => {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -75);
    setTimeout(goTop, 0);
  }
};

const goTopWive = () => {
  const wiveSet = window.pageYOffset;
  const coordinats = document.documentElement.clientHeight;
  if (wiveSet > coordinats) {
    goTopBtn.classList.remove('is-hidden');
  } else {
    goTopBtn.classList.add('is-hidden');
  }
};

goTopBtn.addEventListener('click', goTop);
addEventListener('scroll', goTopWive);
