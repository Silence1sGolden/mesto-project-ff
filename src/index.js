import "./pages/index.css";
import {
  createNewCard,
  deleteCard,
  handleLikeButton,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  requestAddNewCard,
  requestChangePhoto,
  requestChangeProfile,
  requestDeleteCard,
  requestGetCardsInformation,
  requestGetUserInformation,
} from "./components/api.js";

const clearValidationConfig = {
  errorSelector: ".popup__error",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const cardsListInfo = requestGetCardsInformation();
const userInfo = requestGetUserInformation();
const placesList = document.querySelector(".places__list");
const cardAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageIMG = popupTypeImage.querySelector(".popup__image");
const popupTypeImageCaption = popupTypeImage.querySelector(".popup__caption");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupEditForm = document.forms["edit-profile"];
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardForm = document.forms["new-place"];
const popupDeleteCard = document.querySelector(".popup_type_card-delete");
const popupDeleteForm = document.forms["delete-card"];
const popupChangeProfilePhoto = document.querySelector(
  ".popup_type_change-profile-photo"
);
const popupChangeProfilePhotoForm = document.forms["change-profile-photo"];

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

Promise.all([cardsListInfo, userInfo])
  .then((data) => {
    const { name, about, avatar, _id } = data[1];
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileImage.style.backgroundImage = `url('${avatar}')`;
    data[0].forEach((card) => {
      const newCard = createNewCard(
        card,
        _id,
        openDeleteCardPopup,
        openCardPopup,
        handleLikeButton
      );
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    writeError(err);
  });

popupChangeProfilePhotoForm.addEventListener(
  "submit",
  handleChangeProfilePhoto
);

profileImage.addEventListener("click", () => {
  openModal(popupChangeProfilePhoto);
});

popupChangeProfilePhotoForm.addEventListener(
  "submit",
  handleChangeProfilePhoto
);

profileEditButton.addEventListener("click", () => {
  popupEditForm.name.value = profileName.textContent;
  popupEditForm.description.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

cardAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

popupNewCardForm.addEventListener("submit", handleNewCardFormSubmit);
popupEditForm.addEventListener("submit", handleProfileEditFormSubmit);
popupDeleteForm.addEventListener("submit", handleDeleteCard);

function openDeleteCardPopup(event, card) {
  openModal(popupDeleteCard);

  const confirmDeleteCard = (evt) => {
    evt.preventDefault();
    handleDeleteCard(card, event.target.closest(".card"));
  };

  popupDeleteForm.querySelector(".popup__button").onclick = confirmDeleteCard;
}

function openCardPopup(evt) {
  if (evt.target.classList.contains("card__image")) {
    const card = evt.target.closest(".card");
    const cardTitle = card.querySelector(".card__title").textContent;
    const cardURL = card.querySelector(".card__image").getAttribute("src");

    popupTypeImageIMG.setAttribute("src", cardURL);
    popupTypeImageIMG.setAttribute("alt", cardTitle);
    popupTypeImageCaption.textContent = cardTitle;

    openModal(popupTypeImage);
  }
}

function handleChangeProfilePhoto(evt) {
  evt.preventDefault();

  toggleLoadingState(popupChangeProfilePhotoForm, true);
  const link = popupChangeProfilePhotoForm.link.value;
  requestChangePhoto(link)
    .then((data) => {
      profileImage.style.backgroundImage = `URL(${data.avatar})`;
      closeModal(popupChangeProfilePhoto);
      clearValidation(popupChangeProfilePhoto, clearValidationConfig);
    })
    .catch((err) => {
      writeError(err);
    })
    .finally(() => {
      toggleLoadingState(popupChangeProfilePhotoForm, false);
    });
}

function handleDeleteCard(card, localCard) {
  requestDeleteCard(card._id)
    .then(() => {
      deleteCard(localCard);
      closeModal(popupDeleteCard);
    })
    .catch((err) => {
      writeError(err);
    });
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  toggleLoadingState(popupEditForm, true);
  requestChangeProfile(
    popupEditForm.name.value,
    popupEditForm.description.value
  )
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupTypeEdit);
      clearValidation(popupTypeEdit, clearValidationConfig);
    })
    .catch((err) => {
      writeError(err);
    })
    .finally(() => {
      toggleLoadingState(popupTypeEdit, false);
    });
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  toggleLoadingState(popupNewCardForm, true);
  requestAddNewCard(
    popupNewCardForm["place-name"].value,
    popupNewCardForm.link.value
  )
    .then((card) => {
      const newCard = createNewCard(
        card,
        card.owner._id,
        openDeleteCardPopup,
        openCardPopup,
        handleLikeButton
      );
      placesList.prepend(newCard);
      closeModal(popupTypeNewCard);
      clearValidation(popupTypeNewCard, clearValidationConfig);
    })
    .catch((err) => {
      writeError(err);
    })
    .finally(() => {
      toggleLoadingState(popupNewCardForm, false);
    });
}

function toggleLoadingState(popup, state) {
  const button = popup.querySelector(".popup__button");
  if (state) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
}

function writeError(err) {
  console.log(err);
}
