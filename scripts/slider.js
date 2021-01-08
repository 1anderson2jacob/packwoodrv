'use strict';
let slideIndex = 1;
bindSlider();

function bindSlider() {
  // const leftSliderBtn = document.getElementById('slider-left-btn');
  // const rightSliderBtn = document.getElementById('slider-right-btn');
  const slider = document.getElementById('slider');

  slider.addEventListener('click', (e) => {
    // console.log(e.)
    if (e.target && e.target.id == 'slider-left-btn') {
      changeSlide(e.target.id);
    }
    if (e.target && e.target.id == 'slider-right-btn') {
      changeSlide(e.target.id);
    }
  })

}

function changeSlide(arrow) {
  let slides = document.getElementsByClassName("slider-image-container");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  if (arrow == 'slider-right-btn') { //increment
    slideIndex++;

    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
  } else if (arrow == 'slider-left-btn') { //decrement
    slideIndex--;

    if (slideIndex < 1) {
      slideIndex = (slides.length);
    }
  }
  console.log('showing slide ' + slideIndex);

  slides[slideIndex - 1].style.display = "block"

}