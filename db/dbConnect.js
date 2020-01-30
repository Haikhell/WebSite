const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;

module.exports.connectDb = async function connectDb(nameDb) {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const collection = client.db(process.env.GLOBAL_DB);
    const coll = collection.collection(nameDb);
    return [ client, coll ];
  } catch (error) {
    console.log(error);
  }
};

module.exports.dissconectDb = async function dissconnectDb(client) {
  await client.close();
};
