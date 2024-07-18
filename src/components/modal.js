function openModal(target) {
    if (target.classList.contains('popup_type_edit')) {
        const profileName = document.querySelector('.profile__title').textContent;
        const profileDescription = document.querySelector('.profile__description').textContent;
        const name = target.querySelector('.popup__input_type_name');
        const description = target.querySelector('.popup__input_type_description');
        
        name.value = profileName;
        description.value = profileDescription;
    }
    target.addEventListener('keydown', escapeCloseModal)
    target.classList.toggle('popup_is-opened');
}

function closeModal(target) {
    target.closest('.popup').classList.toggle('popup_is-opened');
}

function escapeCloseModal(evt) {
    if (evt.key === "Escape") {
        document.querySelector('.popup_is-opened').removeEventListener('keydown', escapeCloseModal);
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

export {
    openModal,
    closeModal
}