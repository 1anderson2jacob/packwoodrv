'use strict';

const BACKEND_URL = 'http://localhost:3000';
// const BACKEND_URL = 'https://packwoodrv-backend.herokuapp.com';
const session_id = window.location.href.split('session_id=').pop();

// async function getReservationStatus(session_id) {
//   const url = `${BACKEND_URL}/api/v1/reservations/${session_id}`;
//   const response = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).catch(err => {
//     console.log('in await .catch()', err);
//     // document.getElementById('server-error').style.display = 'block';
//   });

//   // console.log(response.json());
//   // let res = response;
//   // console.log(res);
//   // return res;
//   // return response.json();
//   return response.json();
// }

// getReservationStatus(session_id)
//   .then(data => {
//     console.log(data);
//     // reservation exists
//     document.getElementById('successful-reservation').style.display = 'block';
//   })
//   .catch(err => {
//     // no such reservation exists
//     console.log(err)
//     document.getElementById('unsuccessful-reservation').style.display = 'block';
//   });

// try {
//   getReservationStatus(session_id);
// } catch (error) {
//   console.log('try catch error', error);
// }

async function getReservationStatus(session_id) {
  const url = `${BACKEND_URL}/api/v1/reservations/${session_id}`;
  await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    console.log(response);
    if (response.status >= 200 && response.status < 400) {
      document.getElementById('successful-reservation').style.display = 'block';
    }
    if (response.status >= 400) {
      document.getElementById('unsuccessful-reservation').style.display = 'block';
    }
  }, error => {
    console.log('trycatch', error);
    document.getElementById('server-error').style.display = 'block';
  });
}

getReservationStatus(session_id);