'use strict';

import {default as configVars}  from './config-vars.js';
const {BACKEND_URL} = configVars;
const session_id = window.location.href.split('session_id=').pop();

async function getReservationStatus(session_id) {
  const url = `${BACKEND_URL}/api/v1/reservations/${session_id}`;
  await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.status >= 200 && response.status < 400) {
      document.getElementById('successful-reservation').style.display = 'block';
    }
    if (response.status >= 400) {
      document.getElementById('unsuccessful-reservation').style.display = 'block';
    }
  }, error => {
    document.getElementById('server-error').style.display = 'block';
  });
}

getReservationStatus(session_id);