const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect=require('./util/database').mongoConnect;
const User=require('./models/user');
const app = express();

const errorController=require('./controllers/error')




app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("632061e00a0fbdcec986ee6d")
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      // console.log('>>>>>>>>>>>',req.user )
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin',adminRoutes);
app.use(shopRoutes);



app.use(errorController.get404);


mongoConnect((client)=>{
  console.log('connected');
  app.listen(3030)
})











// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then(result => {
//     return User.findOne({where:{id:1}});
//     // console.log(result);
//   })
//   .then(user => {
//     if (!user) {
//       return User.create({ name: 'Max', email: 'test@test.com' });
//     }
//     return user;
//   })
//   .then(user => {
//     // console.log(user);
//     return user.createCart();
//   })
//   .then(cart => {
//     app.listen(3030);
//   })
//   .catch(err => {
//     console.log(err);
//   });
