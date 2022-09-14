const mongodb=require('mongodb')
const getDb=require('../util/database').getDb;

class User{
  constructor(name,email){
    this.name=name;
    this.email=email
  }
  save(){
    const db=getDb();
    return db.collection('users').insertOne(this).then(user=>{return user}).catch(err=>{console.log(err);})
  }
  static findById(userId){
    const db=getDb();
    return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next().then().catch(err=>{console.log(err);})
  }
}

module.exports=User









// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });
// module.exports = User;



