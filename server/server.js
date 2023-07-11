const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const cors = require('cors');


app.use(cors());
app.use(express.json());

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
.then(client => {
    const db = client.db('phoenix_stocks');
    const ordersCollection = db.collection('orders');
    const ordersRouter = createRouter(ordersCollection);
    app.use('/api/orders', ordersRouter);
})
.catch(console.error);


app.listen(9000, function (req, res) {
    console.log(`Listening on port ${this.address().port}`);
});
