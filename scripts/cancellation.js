'use strict';

import {default as configVars}  from './config-vars.js';
const {BACKEND_URL} = configVars;
const cancelButton = document.getElementById('cancel-button');


const ids = window.location.href.split('session_id=').pop();
const session_id = ids.split('&')[0];
const payment_intent = ids.split('=')[1];

console.log('session_id: ', session_id);
console.log('payment_intent: ', payment_intent);

cancelButton.addEventListener('click', (e) => {
  deleteReservation();
});

async function deleteReservation() {

  await fetch(`${BACKEND_URL}/stripe/cancellation`, {
    method: 'DELETE',
    body: new URLSearchParams({
      'payment_intent': payment_intent,
      'session_id': session_id,
    }),
  }) 
    .then(response=>response.json())
    .then(data=>{ 
      console.log(data);
      window.location.href = data;
    })
    .catch(error => {
      console.log(error);
    });
}