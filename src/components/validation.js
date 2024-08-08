function enableValidation(configuration) {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = configuration;
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(inputSelector));

    toggleButtonState(inputList, form.querySelector(submitButtonSelector), inactiveButtonClass);
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        isValid(form, input, inputErrorClass, errorClass);
        toggleButtonState(
          inputList,
          form.querySelector(submitButtonSelector),
          inactiveButtonClass
        );
      });
    });
  });
}

function isValid(form, input, inputErrorClass, errorClass) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (input.validity.patternMismatch) {
    showInputError(
      input,
      inputErrorClass,
      errorClass,
      input.dataset.errorMsg,
      errorElement
    );
  } else {
    if (input.validity.valid) {
      hideInputError(input, inputErrorClass, errorClass, errorElement);
    } else {
      showInputError(
        input,
        inputErrorClass,
        errorClass,
        input.validationMessage,
        errorElement
      );
    }
  }
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function clearValidation(form, validationConfig = false) {
  if (!validationConfig) {
    const inputElements = Array.from(form.querySelectorAll(".popup__input"));
    const errorElements = Array.from(form.querySelectorAll(".popup__error"));
    inputElements.forEach((elem) => {
      elem.classList.remove("popup__input_type_error");
      elem.value = "";
    });
    errorElements.forEach((elem) => {
      elem.classList.remove("popup__error_visible");
      elem.textContent = "";
    });
    const button = form.querySelector(".popup__button");
    button.disabled = true;
    button.classList.add("popup__button_disabled");
  }
}

function showInputError(
  input,
  inputErrorClass,
  errorClass,
  errorMessage,
  errorElement
) {
  input.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(input, inputErrorClass, errorClass, errorElement) {
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
}

export { enableValidation, clearValidation };
