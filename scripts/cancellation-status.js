const success = window.location.href.split('success=').pop();
const successfulEl = document.getElementById('cancel-successful');
const unsuccessfulEl = document.getElementById('cancel-unsuccessful');

console.log(success);

success === 'true' ? successfulEl.style.display = 'block' : unsuccessfulEl.style.display = 'block';