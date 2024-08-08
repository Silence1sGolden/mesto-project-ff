import { requestGetCardsInformation, requestLikeCard, requestUnlikeCard } from "./api";

function createNewCard(
  cardData,
  userId,
  openDeleteCardFunc,
  openCardFunc,
  likeCardFunc
) {
  const { name, link, likes } = cardData;
  const ownerCardId = cardData.owner._id;

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card");
  const newCard = cardElement.cloneNode(true);
  const cardTitle = newCard.querySelector(".card__title");
  const cardImage = newCard.querySelector(".card__image");
  const cardLikeButton = newCard.querySelector(".card__like-button");
  const cardDeleteButton = newCard.querySelector(".card__delete-button");
  const likeCounter = newCard.querySelector(".card__like-counter");

  if (
    likes.find((likedUser) => {
      return likedUser._id == userId;
    })
  ) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  if (userId == ownerCardId) {
    cardDeleteButton.addEventListener("click", openDeleteCardFunc);
  } else {
    cardDeleteButton.remove();
  }

  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardTitle.textContent = name;
  cardImage.addEventListener("click", openCardFunc);
  cardLikeButton.addEventListener("click", likeCardFunc);

  likeCounter.textContent = likes.length;

  return newCard;
}

function deleteCard(card) {
  card.remove();
}

function handleLikeButton(evt) {
  const cardList = Array.from(document.querySelectorAll(".card"));
  const cardIndex = cardList.indexOf(evt.target.closest(".card"));
  const button = evt.target;

  requestGetCardsInformation()
    .then((serverCardList) => {
      if (cardList.length == serverCardList.length) {
        return serverCardList[cardIndex]._id;
      } else {
        return Promise.reject(
          "Данные сервера и сайта отличаются, пожалуйста, перезагрузите страницу."
        );
      }
    })
    .then((cardId) => {
      if (button.classList.contains("card__like-button_is-active")) {
        requestUnlikeCard(cardId).then((cardData) => {
          button
            .closest(".card__like")
            .querySelector(".card__like-counter").textContent =
            cardData.likes.length;
          button.classList.remove("card__like-button_is-active");
        });
      } else {
        requestLikeCard(cardId).then((cardData) => {
          button
            .closest(".card__like")
            .querySelector(".card__like-counter").textContent =
            cardData.likes.length;
          button.classList.add("card__like-button_is-active");
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createNewCard, handleLikeButton, deleteCard };
