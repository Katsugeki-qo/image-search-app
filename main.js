// API key
const accessKey = 'ptp9UhZlnhhutRwzS67C5YBJKU_gwWWQ_eKMu9K5B9o';

// Query Selectors
const formElement = document.querySelector('form');
const inputElement = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more-button');

let inputData = '';
let page = 1;

async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = '';
  }

  if (results.length === 0) {
    searchResults.innerHTML = '<p class="no-results-message">No results found.</p>';
    showMore.style.display = 'none';
    return;
  }

  results.map((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');

    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMore.style.display = 'block';
  }
}

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener('click', () => {
  searchImages();
});

