import './pages/index.css';
import { initialCards } from '../src/cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');

const cardList = document.querySelector('.places__list');

function createNewCard(name, link) {
    const newCard = cardElement.cloneNode(true);
    const cardTitle = newCard.querySelector('.card__title');
    const cardImage = newCard.querySelector('.card__image');
    const cardDeleteButton = newCard.querySelector('.card__delete-button');
    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);
    cardTitle.textContent = name;
    cardDeleteButton.addEventListener('click', (e) => deleteCard(e.target));
    return newCard;
}

function deleteCard(target) {
    target.closest('.card').remove();
}

initialCards.forEach((item) => cardList.append(createNewCard(item.name, item.link)));