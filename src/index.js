import "./pages/index.css";
import { initialCards, createNewCard, handleLikeButton, deleteCard } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

const cardList = document.querySelector(".places__list");
const cardAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const places = document.querySelector(".places"); // область расположения всех карточек

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupEditForm = popupTypeEdit.querySelector(".popup__form");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = popupTypeNewCard.querySelector(".popup__form");

initialCards.forEach((item) =>
  cardList.append(createNewCard(item.name, item.link))
);

places.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    const popupImage = popupTypeImage.querySelector(".popup__image");
    const popupCaption = popupTypeImage.querySelector(".popup__caption");
    const cardName = evt.target.closest(".card").querySelector(".card__title").textContent;

    popupImage.setAttribute("src", evt.target.getAttribute("src"));
    popupImage.setAttribute("alt", cardName);
    popupCaption.textContent = cardName;

    openModal(popupTypeImage);
  }
});

profileEditButton.addEventListener("click", () => {
  const inputName = popupTypeEdit.querySelector(".popup__input_type_name");
  const inputDescription = popupTypeEdit.querySelector(".popup__input_type_description");
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  
  openModal(popupTypeEdit);
});

cardAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

places.addEventListener("click", handleLikeButton);

popupNewCardForm.addEventListener("submit", handleFormSubmit);
popupEditForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();

  if (evt.target.closest('.popup').classList.contains('popup_type_edit')) {
    const profileName = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    const inputName = document.forms['edit-profile'].name;
    const inputDescription = document.forms['edit-profile'].description;

    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    closeModal(evt.target.closest(".popup"));
  }
  
  if (evt.target.closest('.popup').classList.contains('popup_type_new-card')) {
    const inputName = document.forms['new-place']['place-name'];
    const inputURL = document.forms['new-place'].link;
    const newCard = createNewCard(inputName.value, inputURL.value, deleteCard);
    
    cardList.prepend(newCard);
    inputName.value = "";
    inputURL.value = "";
  
    closeModal(evt.target.closest(".popup"));
  }
}