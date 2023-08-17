import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = "1";
let page = 1;
const searchQuery = "";

// Functions

async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const json = await response.json();
  cardContainer.innerHTML = "";
  maxPage = json.info.pages;
  pagination.textContent = `${page} / ${maxPage}`;

  return json.results.forEach((character) => {
    const card = createCharacterCard(character);
    cardContainer.append(card);
  });
}

fetchCharacters();

prevButton.addEventListener("click", () => {
  if (page > 1) {
    --page;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    ++page;
    fetchCharacters();
  }
});
