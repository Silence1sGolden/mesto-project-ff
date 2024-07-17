// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
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
// @todo: Функция удаления карточки
function deleteCard(target) {
    target.closest('.card').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((item) => cardList.append(createNewCard(item.name, item.link)));