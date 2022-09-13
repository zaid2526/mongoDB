// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'root', {
//   dialect: 'mysql',
//   host: 'localhost'
// });
// module.exports = sequelize;






const mongodb=require('mongodb');

const MongoClient=mongodb.MongoClient;
let _db;
const mongoConnect=(callback)=>{
  MongoClient.connect(
    'mongodb+srv://Atlas_admin:admin@udemymongo.lotdnrm.mongodb.net/shop?retryWrites=true&w=majority'
    )
      .then(client=>{
        console.log(client);
        _db=client.db();
        callback(client);
      })
      .catch(err=>{
        console.log(err);
      });
}

const getDb=()=>{
  if(_db){
    return _db;
  }
  throw "no database found"
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;