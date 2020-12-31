'use strict';
bindImgs();
bindModal();

function bindModal() {
  const modal = document.getElementById('modal');
  const popup = document.getElementById('popup');
  modal.addEventListener('click', (e) => {
    if (modal.style.display !== 'none') {
      modal.style.display = 'none';
      popup.style.display = 'none';

      document.querySelector("body").style.overflow = 'visible';
    }
  })
}

function bindImgs() {
  const elements = document.getElementsByClassName('modal-img');
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', (e) => {
      if (e.target && e.target.nodeName == "IMG") {
        displayModal(e);
      }
    })
  }
}

function displayModal(e) {
  const modal = document.getElementById('modal');
  const popup = document.getElementById('popup');
  const imgSrc = e.target.src;

  if (modal.style.display !== 'inline') {
    popup.setAttribute('src', imgSrc);

    modal.style.display = 'inline';
    popup.style.display = 'block';

    document.querySelector("body").style.overflow = 'hidden';
  }
}
