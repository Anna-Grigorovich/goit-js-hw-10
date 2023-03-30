import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(handleInputText, DEBOUNCE_DELAY));

// console.log(inputEl);

function handleInputText(e) {
  const name = e.target.value.trim();
  if (name.length === 0) return;

  fetchCountries(name)
    .then(country => {
      createMarkup(country);
      console.log(country);
    })
    .catch(error);
}

function createMarkup(country) {
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (country.length === 1) {
    createMarkupOne(country);
  } else if (country.length <= 10) {
    createMarkupAll(country);
  }
}

function createMarkupOne(country) {
  const markup = country
    .map(({ name, population, capital, flags, languages }) => {
      return `<li class="country-item">
         <div class="wrap-flag-single" > <img src="${
           flags.svg
         }" alt="flag" width="50" >
         <h2>${name.official}</h2></div>
         <p> Population: ${population} </p>
         <p> Capital: ${capital}</p>
         <p> Languages: ${Object.values(languages)}</p>
          </li>
        `;
    })
    .join('');
  ul.innerHTML = markup;
}
function createMarkupAll(country) {
  const markup = country
    .map(({ name, population, capita, flags, languages }) => {
      return `<li class="countrys-item">
         <div class="wrap-flag"> <img src="${flags.svg}" alt="flag" width="50" height="20" >
         <h2 class="countrys-title">${name.official}</h2></div>
          </li>
        `;
    })
    .join('');
  ul.innerHTML = markup;
}
function error() {
  Notify.failure('Oops, there is no country with that name');
}
