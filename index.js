import { createCharacterCard } from "./components/card/card.js";

//const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 1;
const searchQuery = "";

// Functions

async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const json = await response.json();

  return json.results.forEach((character) => {
    createCharacterCard(character);
  });
}

function pageChange() {
  const pageChange = `<span class="navigation__pagination" data-js="pagination">${page} / ${maxPage}</span>`;
  pagination.innerHTML = pageChange;
}

pageChange();
fetchCharacters();

prevButton.addEventListener("click", async (event) => {
  if (page === 1) {
    event.target.disabled = true;
  } else {
    --page;
    const characters = await fetchCharacters();
    createCharacterCard(characters);
    pageChange();
  }
});

nextButton.addEventListener("click", async (event) => {
  if (page === maxPage) {
    event.target.disabled = true;
  } else {
    page++;
    const characters = await fetchCharacters();
    createCharacterCard(characters);
    pageChange();
  }
});
