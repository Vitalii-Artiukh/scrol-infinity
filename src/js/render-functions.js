export const createGalleryCard = imageSet => {
  return `<li class="gallery-card">
            <a href="${imageSet.largeImageURL}" class="gallery-link">
              <img class="image-normal" src="${imageSet.webformatURL}" alt="${imageSet.tags}"/>
              <ul class="image-text">
                <li class="image-text-item">
                  <p class="key key-likes">Likes</p>
                  <p class="value value-likes">${imageSet.likes}</p>
                </li>
                <li class="image-text-item">
                  <p class="key key-views">Viwes</p>
                  <p class="value value-views">${imageSet.views}</p>
                </li>
                <li class="image-text-item">
                  <p class="key key-comments">Comments</p>
                  <p class="value value-comments">${imageSet.comments}</p>
                </li>
                <li class="image-text-item">
                  <p class="key key-downloads">Downloads</p>
                  <p class="value value-downloads">${imageSet.downloads}</p>
                </li>
              </ul>
            </a>
          </li>`;
};
