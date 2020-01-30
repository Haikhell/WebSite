const db = require('./../../db/dbConnect');

/// get masiv - obj
module.exports.addMovieLike = async function addMovieLike(id) {
  let coll = await db.connectDb(process.env.MOVIE_DB);
  let mov = await coll[1].findOne({ id });
  if (mov != null) {
    let uptad = mov.like + 1;
    coll[1].findOneAndUpdate({ id }, { $set: { like: uptad } });
  }
  db.dissconectDb(coll[0]);
};

module.exports.getAllVideo = async function getAllVideo() {
  let coll = await db.connectDb(process.env.MOVIE_DB);

  let mov = await coll[1].find({}).toArray();
  let mas = [];
  mov.forEach((element) => {
    let temp = {
      name: element.name,
      id: element.id,
      photoPath: element.photoPath,
      watchs: element.watchs
    };
    mas.push(temp);
  });
  mas.reverse();
  db.dissconectDb(coll[0]);
  return mas;
};

module.exports.addMovieWatch = async function addMovieWatch(id) {
  let coll = await db.connectDb(process.env.MOVIE_DB);
  let mov = await coll[1].findOne({ id });
  if (mov != null) {
    let uptad = mov.watchs + 1;
    coll[1].findOneAndUpdate({ id }, { $set: { watchs: uptad } });
  }
  db.dissconectDb(coll[0]);
};

module.exports.getCategoryVideo = async function getCategoryVideo(name) {
  let coll = await db.connectDb(process.env.MOVIE_DB);
  let mov = await coll[1].find({}).toArray();
  let mas = [];
  mov.forEach((element) => {
    if (element.category.includes(name)) {
      let temp = {
        photoPath: element.photoPath,
        name: element.name,
        id: element.id,
        watchs: element.watchs
      };
      mas.push(temp);
    }
  });
  db.dissconectDb(coll[0]);
  return mas;
};

module.exports.getVideo = async function getVideo(id) {
  let coll = await db.connectDb(process.env.MOVIE_DB);
  let mov = await coll[1].findOne({ id });
  await db.dissconectDb(coll[0]);
  if (mov != null) {
    return [ mov.path, mov.descriptions, mov.like ];
  } else {
    return null;
  }
};
module.exports.getVideoFavorite = async function getVideoFavorite(id) {
  let coll = await db.connectDb(process.env.MOVIE_DB);
  let mov = await coll[1].findOne({ id });
  db.dissconectDb(coll[0]);
  if (mov != null) {
    return {
      photoPath: mov.photoPath,
      name: mov.name,
      id: mov.id,
      watchs: mov.watchs
    };
  } else {
    return null;
  }
};
module.exports.getLastId = async function getLastId() {
  let coll = await db.connectDb(process.env.MOVIE_DB);
  let mov = await coll[1].find({}).toArray();
  let maxElem = 0;
  mov.forEach((element) => {
    if (element.id > maxElem) {
      maxElem = element.id;
    }
  });
  db.dissconectDb(coll[0]);
  return maxElem;
};
module.exports.setVideo = async function setVideo(name, id, like, watchs, category, path, photoPath, descriptions) {
  let coll = await db.connectDb(process.env.MOVIE_DB);

  var temp = {
    name,
    id,
    like,
    watchs,
    path,
    category,
    photoPath,
    descriptions
  };

  coll[1].insertOne(temp);
  db.dissconectDb(coll[0]);
  return 'successful';
};

module.exports.getVideoByName = async function getVideoByName(name) {
  let coll = await db.connectDb(process.env.MOVIE_DB);
  const searchRegExp = RegExp('^' + name + '.*', 'ig');
  let mov = await coll[1].find({ name: { $regex: searchRegExp } }).toArray();

  mas = [];
  if (mov != null) {
    if (searchRegExp == '') {
      db.dissconectDb(coll[0]);
      this.getAllVideo();
    } else {
      mov.forEach((element) => {
        let temp = {
          photoPath: element.photoPath,
          name: element.name,
          id: element.id,
          watchs: element.watchs
        };
        mas.push(temp);
      });
      db.dissconectDb(coll[0]);
      return mas;
    }
  } else {
    db.dissconectDb(coll[0]);
    return null;
  }
};
module.exports.getTopVideo = async function getTopVideo() {
  let coll = await db.connectDb(process.env.MOVIE_DB);
  let mov = await coll[1].find({}).toArray();
  let mas = [];
  for (let i = mov.length - 3; i < mov.length; i++) {
    let temp = {
      name: mov[i].name,
      id: mov[i].id,
      photoPath: mov[i].photoPath,
      watchs: mov[i].watchs
    };
    mas.push(temp);
  }

  db.dissconectDb(coll[0]);
  return mas;
};
