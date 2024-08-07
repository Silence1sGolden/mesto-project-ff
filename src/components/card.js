import { reqGetCardsInformation, reqLikeCard, reqUnlikeCard } from "./api";

function createNewCard(card, userId, openDeleteCardPopup, openCardFunc, likeCardFunc) {
  const { name, link, likes} = card;
  const ownerId = card.owner._id;

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card");
  const newCard = cardElement.cloneNode(true);
  const cardTitle = newCard.querySelector(".card__title");
  const cardImage = newCard.querySelector(".card__image");
  const cardLikeButton = newCard.querySelector(".card__like-button");
  const cardDeleteButton = newCard.querySelector(".card__delete-button");
  const likeCounter = newCard.querySelector('.card__like-counter');

  if (card.likes.find((item) => {
    return item._id == userId;
  })) {
    cardLikeButton.classList.add('card__like-button_is-active')
  }
  if (userId == ownerId) {
    cardDeleteButton.addEventListener("click", openDeleteCardPopup);
  } else {
    cardDeleteButton.remove();
  }

  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardTitle.textContent = name;
  cardImage.addEventListener('click', openCardFunc);
  cardLikeButton.addEventListener('click', likeCardFunc)
  
  likeCounter.textContent = likes.length;

  return newCard;
}

function deleteCard(card) {
  card.remove();
}

function handleLikeButton(evt) {
  const cardList =  Array.from(document.querySelectorAll('.card'));
  const cardIndex = cardList.indexOf(evt.target.closest('.card'));
  const button = evt.target;
  if (button.classList.contains('card__like-button_is-active')) {
    reqGetCardsInformation().then((data) => {
      return data[cardIndex]._id;
    }).then((id) => {
      return reqUnlikeCard(id);
    }).then((res) => {
      button.closest('.card__like').querySelector('.card__like-counter').textContent = res.likes.length;
      button.classList.remove("card__like-button_is-active");
    })
  } else {
    reqGetCardsInformation().then((data) => {
      return data[cardIndex]._id;
    }).then((id) => {
      return reqLikeCard(id);
    }).then((res) => {
      button.closest('.card__like').querySelector('.card__like-counter').textContent = res.likes.length;
      button.classList.add("card__like-button_is-active");
    })
  }
}

export { createNewCard, handleLikeButton, deleteCard };
