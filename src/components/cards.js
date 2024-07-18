const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');

function createNewCard(name, link) {
  const newCard = cardElement.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  const cardImage = newCard.querySelector('.card__image');
  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardTitle.textContent = name;
  cardDeleteButton.addEventListener('click', (e) => deleteCard(e.target));
  return newCard;
}

function deleteCard(target) {
  target.closest('.card').remove();
}

export {
  createNewCard,
  deleteCard,
  initialCards
}