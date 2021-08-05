import { blackOut, addHighlight, removeHighlight } from './highlight-sites.js';


// const URL = 'https://packwoodrv.com/reservations';
// const URL = '*';

// window.addEventListener("message", event => {
//   if (event.origin !== URL) {
//     return;
//     console.log('bad origin');  
//   }

//   arr = event.data;
//   console.log(arr);
//   addHightlight(arr);
// }, false)
let litArr = [];
let unavailableSites = window.unavailableSites;
console.log(unavailableSites);
setTimeout(() => {
  blackOut(unavailableSites);
}, 150);

$('#map_ID').on('click', function (e) {
  let siteNum = e.target.id.replace(/\D/g, '');
  console.log(unavailableSites);
  console.log(siteNum);
  if (!unavailableSites.includes(siteNum)) {

    if (!litArr.includes(siteNum)) {
      litArr.push(siteNum);
      addHighlight(siteNum);
      // window.opener.windowTest(siteNum);
      window.parent.windowTest(siteNum);
    } else {
      const index = litArr.indexOf(siteNum);
      litArr.splice(index, 1);
      removeHighlight(siteNum);
    }
  }


  // window.opener.yourFunction()
  // to a parent window function (eg to update selected sites)
});
