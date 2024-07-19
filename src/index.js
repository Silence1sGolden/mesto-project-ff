import "./pages/index.css";

import {
  initialCards,
  createNewCard,
  handleLikeButton,
} from "./components/cards.js";

import {
  openModal,
  openCardModal,
  closeModal,
  checkClickOverlay,
  openEditProfileModal,
  handleAddCardFormSubmit,
  handleEditProfileFormSubmit,
} from "./components/modal.js";

const cardList = document.querySelector(".places__list");
const cardAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const places = document.querySelector(".places"); // область расположения всех карточек

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector('.popup_type_image');
const popupEditForm = popupTypeEdit.querySelector(".popup__form");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = popupTypeNewCard.querySelector(".popup__form");

initialCards.forEach((item) =>
  cardList.append(createNewCard(item.name, item.link))
);

document.querySelectorAll(".popup").forEach((item) => {
  item.querySelector(".popup__close").addEventListener("click", () => closeModal(item));
  item.addEventListener("mousedown", checkClickOverlay);
});

places.addEventListener("click", (evt) => openCardModal(evt, popupTypeImage));

places.addEventListener("click", handleLikeButton);

profileEditButton.addEventListener("click", () => openEditProfileModal(popupTypeEdit));

popupEditForm.addEventListener("submit", (evt) => handleEditProfileFormSubmit(evt, popupTypeEdit));

popupNewCardForm.addEventListener("submit", (evt) => handleAddCardFormSubmit(evt, popupTypeNewCard, cardList));

cardAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});
