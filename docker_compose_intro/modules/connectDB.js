import mongodb from "mongodb";

//Conect to mongo
const MongoClient = mongodb.MongoClient;
const mongoDbUrl =
  "mongodb+srv://ceciidom98:cecemildred@cluster0.macuutn.mongodb.net/?retryWrites=true&w=majority";

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Database is connected");
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbUrl)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized");
  }
  return _db;
};

export { initDb, getDb };