'use strict';

bindModal();

function bindModal() {
  const modal = document.getElementById('modal');
  const popup = document.getElementById('popup-img');
  const popupClose = document.getElementById('popup-close');

  modal.addEventListener('click', (e) => {
    if (modal.style.display !== 'none') {
      modal.style.display = 'none';
      popup.style.display = 'none';
      popupClose.style.display = 'none';

      document.querySelector('body').style.overflow = 'visible';
    }
  });

  popupClose.addEventListener('click', (e) => {
    if (modal.style.display !== 'none') {
      modal.style.display = 'none';
      popup.style.display = 'none';
      popupClose.style.display = 'none';

      document.querySelector('body').style.overflow = 'visible';
    }
  });
}

function displayModal() {
  const modal = document.getElementById('modal');
  const popup = document.getElementById('popup-img');
  const popupClose = document.getElementById('popup-close');

  if (modal.style.display !== 'inline') {
    modal.style.display = 'inline';
    popup.style.display = 'block';
    popupClose.style.display = 'block';

    document.querySelector('body').style.overflow = 'hidden';
  }
}