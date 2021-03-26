'use strict';

// need to change to accept an object that looks like
// {
//   rv-sites: [1, 4, 5, ....],
//   tent-sites: [1, 12, 14]
// }
export function blackOut(arr) {
  let data = {};
  data.alwaysOn = true;
  data.stroke = false;
  data.fillColor = 'black';
  data.fillOpacity = 1;
  for (let i = 0; i < arr.length; i++) {
    $(`#site-${arr[i]}`).data('maphilight', data).trigger('alwaysOn.maphilight');
  }
}

export function addHighlight(num) {
  let data = {};
  data.alwaysOn = true;
  // data.fillColor = '0000FF';
  data.fillColor = '000000';
  data.fillOpacity = 0.4;
  data.strokeColor = '00FF00';
  // data.strokeColor = 'ff0000';
  $(`#site-${num}`).data('maphilight', data).trigger('alwaysOn.maphilight');
}

export function removeHighlight(num) {
  let data = {};
  data.alwaysOn = false;
  $(`#site-${num}`).data('maphilight', data).trigger('alwaysOn.maphilight');
}

// let arr = [42, 15, 7, 12, 80, 1, 45, 33]

// highlightSites(arr);