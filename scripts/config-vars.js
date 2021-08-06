
/*-----------
      Dev
-----------*/
const dev = {
  BACKEND_URL: 'http://localhost:3000',
  FRONTEND_URL: 'http://127.0.0.1:8080',
  STRIPE_PUB_KEY: 'pk_test_51IIdheJUohNhFpMm2NjymlNZLJ9lVsJOhgupmDcUnLfwvtWHjzAVDcQtYisRBOYIhc5SOE6E68SLIUetSGOYF5H400ROSjLhfg',
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
