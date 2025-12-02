import { NEXT_PUBLIC_PEXELS_API_KEY } from "./config.js";
const gallery = document.querySelector(".gallery");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const moreButton = document.querySelector(".more-button");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

// Event listener for the search form submission'
moreButton.addEventListener("click", () => {
  loadMorePhotos();
});

searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value;
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchValue = searchInput.value;
  searchPhotos(searchValue);
});

async function fetchApi() {
  fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${page}`;
  const dataFetch = await fetch(fetchLink, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: NEXT_PUBLIC_PEXELS_API_KEY,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePhotoElement(data) {
  searchInput.value = ""; // Clear search input
  data.photos.forEach((photo) => {
    // Create a new div element for each photo
    const photoElement = document.createElement("div");
    photoElement.classList.add("photo-gallery");
    photoElement.innerHTML = `
            <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href="${photo.src.large}" target="_blank">Download</a>
            </div>
            <img src="${photo.src.large}" alt="${photo.alt}">
    `;
    // Append the photo element to the gallery
    gallery.appendChild(photoElement);
  });
}

// Function to fetch curated photos from Pexels API
async function curatedPhotos(query) {
  page = 1;
  gallery.innerHTML = ""; //  clear only once
  fetchLink = `https://api.pexels.com/v1/curated?per_page=15`;
  const data = await fetchApi(fetchLink);
  generatePhotoElement(data);
}

async function searchPhotos(query) {
  page = 1;
  gallery.innerHTML = ""; //  clear only once
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15`;
  const data = await fetchApi(fetchLink);
  generatePhotoElement(data);
}

async function loadMorePhotos() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    const data = await fetchApi(fetchLink);
    generatePhotoElement(data);
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    const data = await fetchApi(fetchLink);
    generatePhotoElement(data);
  }
}

curatedPhotos();
