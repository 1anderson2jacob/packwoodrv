// Create an instance of the Stripe object with your publishable API key
// const BACKEND_URL = 'https://packwoodrv-backend.herokuapp.com/';
const BACKEND_URL = 'http://localhost:3000';
const STRIPE_PUB_KEY = 'pk_test_51IIdheJUohNhFpMm2NjymlNZLJ9lVsJOhgupmDcUnLfwvtWHjzAVDcQtYisRBOYIhc5SOE6E68SLIUetSGOYF5H400ROSjLhfg';
// const STRIPE_PUB_KEY = 'pk_test_51HeP21DDWjIzZ5AKhZvGvh1tibkK2doangylNyItxkhufFKgNrBCpdPxfw1EarMm2JFpQsaNlIjQFpptWzyXkjMD00UolXiJLB'
var stripe = Stripe(STRIPE_PUB_KEY);

var checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', function () {
  // Create a new Checkout Session using the server-side endpoint you
  // created in step 3.
  fetch(`${BACKEND_URL}/stripe/create-checkout-session`, {
    method: 'POST',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using `error.message`.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
});