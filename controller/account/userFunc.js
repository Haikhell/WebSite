const db = require('./../../db/dbConnect');
const movie = require('../movie/movieFunc');
/// get true or false
module.exports.chekLogin = async function chekLogin(login, password) {
  let coll = await db.connectDb(process.env.USER_DB);
  let user = await coll[1].findOne({ login });

  if (user != null) {
    if (user.password === password) {
      return login;
    }
  }
  db.dissconectDb(coll[0]);
  return null;
};
module.exports.addFavoritesUsers = async function addFavoritesUsers(login, id) {
  let temp = true;
  let coll = await db.connectDb(process.env.USER_DB);
  let user = await coll[1].findOne({ login });
  let mas = [];
  if (user != null) {
    await user.favorites.forEach((element) => {
      if (element == id) {
        temp = false;
      }
    });
    if (temp) {
      mas = user.favorites;
      mas.push(id);
      coll[1].findOneAndUpdate({ login }, { $set: { favorites: mas } });
      db.dissconectDb(coll[0]);
      return 'sucsesful';
    }
  } else {
    db.dissconectDb(coll[0]);
    return null;
  }
};

module.exports.getFavoritesVideo = async function getFavoritesVideo(login) {
  let coll = await db.connectDb(process.env.USER_DB);
  let user = await coll[1].findOne({ login });
  mas = [];
  if (user != null) {
    for (let i = 0; i < user.favorites.length; i++) {
      mas.push(await movie.getVideoFavorite(user.favorites[i]));
    }
    db.dissconectDb(coll[0]);
    return mas;
  } else {
    db.dissconectDb(coll[0]);
    return null;
  }
};
module.exports.registr = async function registr(login, password, mail) {
  let coll = await db.connectDb(process.env.USER_DB);
  user = await coll[1].findOne({ login });
  mai = await coll[1].findOne({ mail });
  if (user == null && mai == null) {
    let temp = {
      mail,
      login,
      password,
      favorites: []
    };
    coll[1].insertOne(temp);
    db.dissconectDb(coll[0]);
    return login;
  } else {
    db.dissconectDb(coll[0]);
    return null;
  }
};
module.exports.getUser = async function getUser() {
  let coll = await db.connectDb(process.env.USER_DB);
  user = await coll[1].find({}).toArray();
  console.log(user);
  db.dissconectDb(coll[0]);
  return user;
};
