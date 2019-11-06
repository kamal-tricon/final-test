
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var axios = require('axios')

var bodyParser = require('body-parser');

var config = require('./config/config');
var Order = require('./model/order.model');


var app = express();

app.use(cors());

mongoose.set('debug', true);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


mongoose.Promise = global.Promise;

mongoose.connect(config.url, {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('successfully connected to mongodb');
}).catch((err) => {
  console.error(err);
})

//Add Order into the DB

app.post('/order/new', (req, res) => {
  
  console.log(req.body);
  const order = new Order(

  {
    custId: req.body.custId,
    itemName: req.body.itemName,
    totalPrice: req.body.totalPrice,
    
  })

  order.save()
   .then((data) => {
        res.send(data);
   })
   .catch((err) => {
        return res.send(err);
   })
});

//Get the order 
app.get('/order/:custId', (req, res) => {
    var id = req.params.custId;
    Order.find({'custId': id}).then((data) => {
        res.send(data);
    })
})

var server = app.listen(8083, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
