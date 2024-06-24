// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createNewCard(name, link) {
    const newCard = cardElement.cloneNode(true);
    newCard.querySelector('.card__image').setAttribute('src', link);
    newCard.querySelector('.card__title').textContent = name;
    newCard.querySelector('.card__delete-button').addEventListener('click', (e) => e.target);
    cardList.append(newCard);
}
// @todo: Функция удаления карточки
function deleteCard(target) {
    target.closest('.card').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((item) => createNewCard(item.name, item.link));