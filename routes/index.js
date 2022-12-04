module.exports = function (app) {
  let api = '/api';
  let authApi = `${api}${process.env.BASE_URL_V1}`;

  /** Non-Authenticated APIs */
  app.use(`${api}`, require('./auth'));

  /** Authenticated APIs */
  app.use(`${authApi}/role`, require('./role'));
  app.use(`${authApi}/user`, require('./user'));
}