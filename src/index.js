import './pages/index.css';
import { initialCards, createNewCard } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

const cardList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const places = document.querySelector('.places');

initialCards.forEach((item) => cardList.append(createNewCard(item.name, item.link)));

document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
})

places.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__image')) {
        const popupImage = popupTypeImage.querySelector('.popup__image');
        const popupCaption = popupTypeImage.querySelector('.popup__caption');
        const cardName = evt.target.closest('.card').querySelector('.card__title').textContent;

        popupImage.setAttribute('src', evt.target.getAttribute('src'));
        popupImage.setAttribute('alt', cardName);
        popupCaption.textContent = cardName;
        openModal(popupTypeImage);
    }
})

profileEditButton.addEventListener('click', () => {
    openModal(popupTypeEdit);
})

profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
})