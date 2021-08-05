'use strict';

const BACKEND_URL = 'http://localhost:3000';
// const BACKEND_URL = 'https://packwoodrv-backend.herokuapp.com';
const session_id = window.location.href.split('session_id=').pop();

async function getReservationStatus(session_id) {
  const url = `${BACKEND_URL}/api/v1/reservations/${session_id}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

getReservationStatus(session_id)
  .then(data => {
    // reservation exists
    document.getElementById('successful-reservation').style.display = 'block';
  })
  .catch(err => {
    // no suck reservation exists
    document.getElementById('unsuccessful-reservation').style.display = 'block';
  });

