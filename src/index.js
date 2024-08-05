import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createNewCard, handleLikeButton, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const cardList = document.querySelector(".places__list");
const cardAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageIMG = popupTypeImage.querySelector('.popup__image');
const popupTypeImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupEditForm = document.forms['edit-profile'];
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms['new-place'];

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

initialCards.forEach((item) =>
  cardList.append(createNewCard(item.name, item.link, deleteCard, openCardPopup, handleLikeButton))
);

profileEditButton.addEventListener("click", () => {
  popupEditForm.name.value = profileName.textContent;
  popupEditForm.description.value = profileDescription.textContent;
  clearValidation(popupEditForm);
  openModal(popupTypeEdit);
});

cardAddButton.addEventListener("click", () => {
  clearValidation(popupNewCardForm);
  openModal(popupTypeNewCard);
});

popupNewCardForm.addEventListener("submit", handleNewCardFormSubmit);
popupEditForm.addEventListener("submit", handleProfileEditFormSubmit);

function openCardPopup(evt) {
  if (evt.target.classList.contains("card__image")) {
    const card = evt.target.closest('.card');
    const cardTitle = card.querySelector('.card__title').textContent;
    const cardURL = card.querySelector('.card__image').getAttribute('src');

    popupTypeImageIMG.setAttribute("src", cardURL);
    popupTypeImageIMG.setAttribute("alt", cardTitle);
    popupTypeImageCaption.textContent = cardTitle;

    openModal(popupTypeImage);
  }
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupEditForm.name.value;
  profileDescription.textContent = popupEditForm.description.value;

  closeModal(evt.target.closest(".popup"));
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  
  const newCardName = popupNewCardForm['place-name'].value;
  const newCardURL = popupNewCardForm.link.value;
  const newCard = createNewCard(newCardName, newCardURL, deleteCard, openCardPopup, handleLikeButton);
  
  cardList.prepend(newCard);
  popupNewCardForm.reset();

  closeModal(evt.target.closest(".popup"));
}