const mongoClient = require("mongodb").MongoClient;

const dbURL = "mongodb://localhost:27017";
const dbName = "shop";

let _dbInstance;

exports.mongoConnect = () => {
  return new Promise((reslove, reject) => {
    mongoClient.connect(dbURL).then((client) => {
      _dbInstance = client.db(dbName);
      reslove();
    }).catch((err) => {
      reject(err);
    });
  });
};

exports.getDb = () => {
  if (_dbInstance) {
    return _dbInstance;
  }
};
