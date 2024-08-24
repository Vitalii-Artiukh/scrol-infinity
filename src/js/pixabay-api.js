import axios from 'axios';

const myKeyPixabay = '45488193-7ca777789e7fbcf45aeeb8195'; // key='***'
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchToPixabay = async (questEntered, Page) => {
  const urlOptions = {
    params: {
      page: Page,
      key: myKeyPixabay,
      q: questEntered,
      image_type: 'photo',
      safesearch: true,
      orientation: 'horizontal',
      per_page: 15,
    },
  };

  return await axios.get('', urlOptions);
};
