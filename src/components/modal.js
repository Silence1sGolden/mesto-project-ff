function openModal(target) {
  target
    .querySelector(".popup__close")
    .addEventListener("click", clickCloseModalButton);
  target.addEventListener("mousedown", checkClickOverlay);
  document.addEventListener("keydown", checkPressEscape);
  target.classList.toggle("popup_is-opened");
}

function closeModal(target) {
  target
    .querySelector(".popup__close")
    .removeEventListener("click", clickCloseModalButton);
  target.removeEventListener("mousedown", checkClickOverlay);
  document.removeEventListener("keydown", checkPressEscape);
  target.classList.toggle("popup_is-opened");
}

function clickCloseModalButton(evt) {
  closeModal(evt.target.closest(".popup"));
}

function checkClickOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

function checkPressEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export { openModal, closeModal };
