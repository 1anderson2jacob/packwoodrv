'use strict'


//thanks Colin Lord @ medium.com

function mapsSelector() {
  if /* if we're on iOS, open in Apple Maps */
    ((navigator.platform.indexOf("iPhone") != -1) ||
    (navigator.platform.indexOf("iPad") != -1) ||
    (navigator.platform.indexOf("iPod") != -1)) {
    window.open("maps://maps.google.com/maps?daddr=46.60565166500709,-121.67335561893312&amp;ll=");
  }

  else { /* else use Google */
    window.open("https://maps.google.com/maps?daddr=46.60565166500709,-121.67335561893312&amp;ll=");
  }

}