const express = require('express');
const cors = require('cors');

const app = express();

//app.use(express.json());

app.use(express.urlencoded({ extended: true}));

//middleware
app.use(express.json())

app.use(express.urlencoded({ extended: true }))


//routers
const router = require('./routes/productRouter.js');
app.use('/api/products', router);


//test api

app.get('/', (req, res) => {
    res.send({ message: 'hello'})
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('server is runnng on port: ' + PORT);
})