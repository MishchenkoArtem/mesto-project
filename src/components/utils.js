const popupList = Array.from(document.querySelectorAll(".popup"));

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handlClosePopupClick);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handlClosePopupClick);
}

function handlClosePopupClick(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});
