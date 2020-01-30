const Router = require('express');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const apiRouter = new Router();

apiRouter.use(require('./movies'), moviesRouter);
apiRouter.use(require('./users'), usersRouter);

module.exports = apiRouter;
