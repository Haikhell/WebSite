const Router = require('express');
const movie = require('./../../controller/movie/movieFunc');
const pPath = require('./../../controller/helper/getPhotoPath');

const moviesRouter = new Router();

moviesRouter.post('/setVideo', async function(req, res) {
  let id = (await movie.getLastId()) + 1;
  let photoPath = await pPath.getPhotoPath(req.body.movi.id, id);
  let mov = await movie.setVideo(
    req.body.movi.name,
    id,
    0,
    0,
    req.body.movi.category,
    `${id}.mp4`,
    photoPath,
    req.body.movi.descriptions
  );
  console.log(mov);
  res.send(mov);
});

moviesRouter.put('/watch/:id', async function(req, res) {
  await movie.addMovieWatch(+req.params.id);
});

moviesRouter.put('/like/:id', async function(req, res) {
  await movie.addMovieLike(+req.params.id);
});

moviesRouter.get('/movie/:id', async function(req, res) {
  let mov = await movie.getVideo(+req.params.id);
  res.send(mov);
});

moviesRouter.get('/category/:name', async function(req, res) {
  let mov = await movie.getCategoryVideo(req.params.name);
  res.send(mov);
});

moviesRouter.get('/', async function(req, res) {
  let mov = await movie.getAllVideo();
  res.send(mov);
});

moviesRouter.get('/search/:text', async function(req, res) {
  mov = await movie.getVideoByName(req.params.text);
  res.send(mov);
});

moviesRouter.get('/getTopVideo', async function(req, res) {
  mov = await movie.getTopVideo();
  res.send(mov);
});

module.exports = moviesRouter;
