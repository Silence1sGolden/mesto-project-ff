import "./pages/index.css";
import {
  createNewCard,
  deleteCard,
  handleLikeButton,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  reqAddNewCard,
  reqChangePhoto,
  reqChangeProfile,
  reqDeleteCard,
  reqGetCardsInformation,
  reqGetUserInformation,
} from "./components/api.js";

const cardList = document.querySelector(".places__list");
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
const popupdeleteForm = document.forms["delete-card"];
const popupChangeProfilePhoto = document.querySelector(
  ".popup_type_change-profile-photo"
);
const popupChangeProfilePhotoForm = document.forms["change-profile-photo"];

// reqGetCardsInformation().then((req) => {
//   console.log(req);
// })

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

reqGetCardsInformation().then((cards) => {
  reqGetUserInformation().then((user) => {
    const { name, about, avatar, _id } = user;
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileImage.style.backgroundImage = `URL('${avatar}')`;
    cards.forEach((card) => {
      const newCard = createNewCard(
        card,
        _id,
        openDeleteCardPopup,
        openCardPopup,
        handleLikeButton
      );
      cardList.append(newCard);
    });
  });
});

profileImage.addEventListener("click", () => {
  clearValidation(popupChangeProfilePhotoForm);
  popupChangeProfilePhotoForm.addEventListener('submit', handleChangeProfilePhoto);
  openModal(popupChangeProfilePhoto);
});

profileEditButton.addEventListener("click", () => {
  clearValidation(popupEditForm);
  popupEditForm.name.value = profileName.textContent;
  popupEditForm.description.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

cardAddButton.addEventListener("click", () => {
  clearValidation(popupNewCardForm);
  openModal(popupTypeNewCard);
});

popupNewCardForm.addEventListener("submit", handleNewCardFormSubmit);
popupEditForm.addEventListener("submit", handleProfileEditFormSubmit);

function openDeleteCardPopup(event) {
  openModal(popupDeleteCard);

  popupdeleteForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handleDeleteCard(event, event.target.closest(".card"));
  });
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

  toggleBootState(popupChangeProfilePhotoForm, true);
  const link = popupChangeProfilePhotoForm.link.value;
  reqChangePhoto(link).then((data) => {
    profileImage.style.backGround = data.avatar;
  }).finally(() => {
    toggleBootState(popupChangeProfilePhotoForm, false);
    closeModal(popupChangeProfilePhoto);
  })
}

function handleDeleteCard(event, card) {
  const cardList = Array.from(document.querySelectorAll(".card"));
  const cardIndex = cardList.indexOf(event.target.closest(".card"));
  reqGetCardsInformation()
    .then((data) => {
      return data[cardIndex]._id;
    })
    .then((cardId) => {
      return reqDeleteCard(cardId);
    })
    .then((res) => {
      if (res.ok) {
        deleteCard(card);
      }
    })
    .finally(() => {
      closeModal(popupDeleteCard);
    });
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  toggleBootState(popupEditForm, true);
  reqChangeProfile(popupEditForm.name.value, popupEditForm.description.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .finally(() => {
      toggleBootState(popupEditForm, false);
      closeModal(evt.target.closest(".popup"));
    });
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  toggleBootState(popupNewCardForm, true);
  reqAddNewCard(
    popupNewCardForm["place-name"].value,
    popupNewCardForm.link.value
  )
    .then((data) => {
      reqGetUserInformation()
        .then((data) => {
          return data._id;
        })
        .then((userId) => {
          const newCard = createNewCard(
            data,
            userId,
            openDeleteCardPopup,
            openCardPopup,
            handleLikeButton
          );
          cardList.prepend(newCard);
        });
    })
    .finally(() => {
      toggleBootState(popupNewCardForm, false);
      closeModal(evt.target.closest(".popup"));
    });
}

function toggleBootState(popup, state) {
  const button = popup.querySelector('.popup__button');
  if (state) {
    button.textContent = 'Сохранение...';
    button.disabled = true;
  } else {
    button.textContent = 'Сохранить';
    button.disabled = false;
  }
}