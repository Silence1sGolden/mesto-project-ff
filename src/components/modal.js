import { createNewCard } from "./cards.js";

function openModal(target) {
  target.addEventListener("keydown", checkPressEscape);
  target.classList.toggle("popup_is-opened");
}

function closeModal(target) {
  target.classList.toggle("popup_is-opened");
}

function checkClickOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    evt.target.removeEventListener("keydown", checkPressEscape);
    closeModal(evt.target);
  }
}

function checkPressEscape(evt) {
  if (evt.key === "Escape") {
    evt.target
      .closest(".popup")
      .removeEventListener("keydown", checkPressEscape);
    closeModal(evt.target.closest(".popup"));
  }
}

function openEditProfileModal(popupTypeEdit) {
  const inputName = popupTypeEdit.querySelector(".popup__input_type_name");
  const inputDescription = popupTypeEdit.querySelector(".popup__input_type_description");
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openModal(popupTypeEdit);
}

function handleEditProfileFormSubmit(evt, popupTypeEdit) {
  evt.preventDefault();

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const inputName = popupTypeEdit.querySelector(".popup__input_type_name");
  const inputDescription = popupTypeEdit.querySelector(".popup__input_type_description");

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closeModal(evt.target.closest(".popup"));
}

function handleAddCardFormSubmit(evt, popupTypeNewCard, cardList) {
  evt.preventDefault();

  const inputName = popupTypeNewCard.querySelector(".popup__input_type_card-name");
  const inputURL = popupTypeNewCard.querySelector(".popup__input_type_url");

  const newCard = createNewCard(inputName.value, inputURL.value);
  cardList.prepend(newCard);

  inputName.value = "";
  inputURL.value = "";

  closeModal(popupTypeNewCard);
}

function openCardModal(evt, popupTypeImage) {
  if (evt.target.classList.contains("card__image")) {
    const popupImage = popupTypeImage.querySelector(".popup__image");
    const popupCaption = popupTypeImage.querySelector(".popup__caption");
    const cardName = evt.target.closest(".card").querySelector(".card__title").textContent;

    popupImage.setAttribute("src", evt.target.getAttribute("src"));
    popupImage.setAttribute("alt", cardName);
    popupCaption.textContent = cardName;
    openModal(popupTypeImage);
  }
}

export {
  openModal,
  closeModal,
  openCardModal,
  checkClickOverlay,
  openEditProfileModal,
  handleAddCardFormSubmit,
  handleEditProfileFormSubmit,
};
