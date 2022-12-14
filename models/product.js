const mongodb=require('mongodb');

const getDb=require('../util/database').getDb;

class Product{
  constructor(title,price,description,imageUrl, id,userId){
    this.title=title;
    this.price=price;
    this.description=description;
    this.imageUrl=imageUrl;
    this._id=id;
    this.userId=userId;
  }
  //only insert........
  // save(){
  //   const db=getDb();
  //   return db.collection('products')
  //   .insertOne(this)
  //   .then((result)=>{
  //     console.log(">>>>>>>>>>>>>> inserted");
  //   })
  //   .catch(err=>{console.log(err);})
  // }

  //update and insert.....
  save(){
    let db=getDb();
    let dbOp;
    if(this._id){
      dbOp=db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this})

    }else{
      dbOp=db.collection('products').insertOne(this);
    }
    return dbOp.then(result=>{
      console.log(result);
    }).catch(err=>{console.log(err);})
  }
  static fetchAll(){
    const db=getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products=>{
        // console.log(produccts);
        return products;
      }).catch(err=>{console.log(err);})
  }
  static findById(prodId){
    const db=getDb();
    return db.collection('products')
      .find({_id:new mongodb.ObjectId(prodId)}).next()
      .then(product=>{console.log(product); return product})
      .catch(err=>{console.log(err);})
  }

  static deleteById(prodId){
    const db=getDb();
    return db.collection('products')
      .deleteOne({_id:new mongodb.ObjectId(prodId)})
      .then(()=>{
        console.log('deleted');
      })
      .catch(err=>{console.log(err);})

  }
}


module.exports = Product;
