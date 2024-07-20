function createNewCard(name, link, deleteCardFunc, openCardFunc, likeCardFunc) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card");

  const newCard = cardElement.cloneNode(true);
  const cardTitle = newCard.querySelector(".card__title");
  const cardImage = newCard.querySelector(".card__image");
  const cardLikeButton = newCard.querySelector(".card__like-button");
  const cardDeleteButton = newCard.querySelector(".card__delete-button");

  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardTitle.textContent = name;
  cardImage.addEventListener('click', openCardFunc);
  cardLikeButton.addEventListener('click', likeCardFunc)
  cardDeleteButton.addEventListener("click", (evt) =>
    deleteCardFunc(evt.target)
  );

  return newCard;
}

function deleteCard(target) {
  target.closest(".card").remove();
}

function handleLikeButton(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { createNewCard, deleteCard, handleLikeButton };
