
/*-----------
      Dev
-----------*/
const dev = {
  BACKEND_URL: 'http://localhost:3000',
  FRONTEND_URL: 'http://127.0.0.1:8080',
  STRIPE_PUB_KEY: 'pk_test_51HeP21DDWjIzZ5AKhZvGvh1tibkK2doangylNyItxkhufFKgNrBCpdPxfw1EarMm2JFpQsaNlIjQFpptWzyXkjMD00UolXiJLB',
};

/*-----------
  Production
-----------*/
// const prod = {
//   BACKEND_URL: 'https://packwoodrv-backend.herokuapp.com',
//   FRONTEND_URL: 'http://packwoodrv.com',
// };

export { 
  dev as default,
  // prod,
};
