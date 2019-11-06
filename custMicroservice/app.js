
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var axios = require('axios')


var bodyParser = require('body-parser');

var config = require('./config/config');
var Customer = require('./model/customer.model');


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

//Add Customer into the DB

app.post('/customer/new', (req, res) => {
  
  console.log(req.body);
  const customer = new Customer(

  {
    custId: req.body.custId,
    name: req.body.name,
    email: req.body.email
  })

  customer.save()
   .then((data) => {
        res.send(data);
   })
   .catch((err) => {
        return res.send(err);
   })
});

//Get all orders of a particular customer

app.get('/customer/:id', (req, res) => {
  const id = req.params.id;
  var details = [];
  Customer.find({'custId': id}).then((data) => {
    
   axios.default.get('http://localhost:8083/order/'+id).then((response) => {
    details.push({'customerDetails': data, 'orderDetails': response.data})
     res.send(details)
   })
    
  })
})



var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
