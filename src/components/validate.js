export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputInvalidClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  buttonSelector: ".popup__button",
  buttonDisabledClass: "popup__button_inactive",
};

export const showInputError = (
  inputElement,
  inputInvalidClass,
  errorElement,
  errorClass,
  errorMessage
) => {
  inputElement.classList.add(inputInvalidClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

export const hideInputError = (
  inputElement,
  inputInvalidClass,
  errorElement,
  errorClass
) => {
  inputElement.classList.remove(inputInvalidClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

export const checkInputValidity = (
  formElement,
  inputElement,
  inputInvalidClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

  if (inputElement.validity.valid) {
    hideInputError(inputElement, inputInvalidClass, errorElement, errorClass);
  } else {
    showInputError(
      inputElement,
      inputInvalidClass,
      errorElement,
      errorClass,
      inputElement.validationMessage
    );
  }
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const disableButton = (buttonElement, buttonDisabledClass) => {
  buttonElement.classList.add(buttonDisabledClass);
  buttonElement.disabled = true;
};

export const enableButton = (buttonElement, buttonDisabledClass) => {
  buttonElement.classList.remove(buttonDisabledClass);
  buttonElement.disabled = false;
};

export const toggleButtonState = (
  formElement,
  inputList,
  buttonSelector,
  buttonDisabledClass
) => {
  const buttonElement = formElement.querySelector(buttonSelector);

  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, buttonDisabledClass);
  } else {
    enableButton(buttonElement, buttonDisabledClass);
  }
};

export const setEventListeners = (
  formElement,
  {
    inputSelector,
    inputInvalidClass,
    errorClass,
    buttonSelector,
    buttonDisabledClass,
  }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputInvalidClass,
        errorClass
      );
      toggleButtonState(
        formElement,
        inputList,
        buttonSelector,
        buttonDisabledClass
      );
    });
  });

  toggleButtonState(
    formElement,
    inputList,
    buttonSelector,
    buttonDisabledClass
  );
};

export const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement, rest);
  });
};
