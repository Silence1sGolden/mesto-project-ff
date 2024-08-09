import { requestLikeCard, requestUnlikeCard } from "./api";

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
  cardLikeButton.addEventListener("click", () => {
    likeCardFunc(cardLikeButton, cardData._id);
  });

  likeCounter.textContent = likes.length;

  return newCard;
}

function deleteCard(card) {
  card.remove();
}

function handleLikeButton(cardLikeButton, cardId) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    requestUnlikeCard(cardId)
      .then((cardData) => {
        cardLikeButton
          .closest(".card__like")
          .querySelector(".card__like-counter").textContent =
          cardData.likes.length;
        cardLikeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    requestLikeCard(cardId)
      .then((cardData) => {
        cardLikeButton
          .closest(".card__like")
          .querySelector(".card__like-counter").textContent =
          cardData.likes.length;
        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createNewCard, handleLikeButton, deleteCard };
