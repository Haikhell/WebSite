const Router = require('express');
const acc = require('./../../controller/account/userFunc');
const usersRouter = new Router();

usersRouter.post('/login', async function(req, res) {
  let result = await acc.chekLogin(req.body.user.login, req.body.user.password);
  res.send(result);
});

usersRouter.post('/registr', async function(req, res) {
  let result = await acc.registr(req.body.user.login, req.body.user.password, req.body.user.mail);
  res.send(result);
});

usersRouter.put('/favorites', async function(req, res) {
  let result = await acc.addFavoritesUsers(req.body.login, +req.body.id);
  res.send(result);
});

usersRouter.get('/getfavorites/:login', async function(req, res) {
  let result = await acc.getFavoritesVideo(req.params.login);
  res.send(result);
});

usersRouter.get('/getUser', async function(req, res) {
  user = await acc.getUser();
  res.send(user);
});

module.exports = usersRouter;
