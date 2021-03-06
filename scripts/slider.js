'use strict';
let slideIndex = 1;
bindSlider();

function bindSlider() {
  const slider = document.getElementById('slider');
  const mc = new Hammer(slider);

  slider.addEventListener('click', (e) => {
    if (e.target && (e.target.id == 'slider-left-btn' || e.target.id == 'slider-left-arrow')) {
      changeSlide('left');
    }
    if (e.target && (e.target.id == 'slider-right-btn' || e.target.id == 'slider-right-arrow')) {
      changeSlide('right');
    }
  });

  mc.on('swipeleft', (e) => {
    changeSlide('right');
  });
  mc.on('swiperight', (e) => {
    changeSlide('left');
  });
}

function changeSlide(arrow) {
  let slides = document.getElementsByClassName('slider-image-container');

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  if (arrow == 'right') { //increment
    slideIndex++;

    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
  } else if (arrow == 'left') { //decrement
    slideIndex--;

    if (slideIndex < 1) {
      slideIndex = (slides.length);
    }
  }

  slides[slideIndex - 1].style.display = 'block';
}