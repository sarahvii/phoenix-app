const express = require('express');
const { ObjectId } = require('mongodb');

const calculateTotalShares = require('../utils/calculate_total_shares.js');


const handleError = err => {
  console.error(err);
  res.status(500).json({ status: 500, error: err });
};

const createRouter = function (collection) {
  const router = express.Router();

  // INDEX
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then(docs => {
        console.log('Documents retrieved:', docs);
        res.json(docs);
      })
      .catch(handleError);
  });

  // SHOW
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: new ObjectId(id) })
      .then(doc => res.json(doc))
      .catch(handleError);
  });

// CREATE
router.post('/', (req, res) => {
  const { ticker, order, stockName } = req.body;

  // Find the stock by ticker
  collection
    .findOne({ ticker })
    .then(stock => {
      if (stock) {
        //If the stock already exists, update it
        stock.orders.push(order);

        // Calculate the new totalShares value
        stock.totalShares = calculateTotalShares(stock);

        // Update the stock in the database
        collection
          .updateOne(
            { _id: stock._id },
            {
              $set: {
                orders: stock.orders,
                totalShares: stock.totalShares
              }
            }
          )
          .then(result => {
            res.json({ message: 'Stock updated successfully.' });
          })
          .catch(error => {
            console.error('Update error:', error);
            res.status(500).json({ message: 'Failed to update stock.' });
          });
      } else {
        // Create a new stock
        const newStock = {
          stockName: stockName,
          ticker: ticker,
          totalShares: parseInt(order.sharesQuantity),
          orders: [order]
        };

        // Insert the new stock into the database
        collection
          .insertOne(newStock)
          .then(result => {
            res.json({ message: 'Stock created successfully.' });
          })
          .catch(error => {
            console.error('Insert error:', error);
            res.status(500).json({ message: 'Failed to create stock.' });
          });
      }
    })
    .catch(error => {
      console.error('Find error:', error);
      res.status(500).json({ message: 'Failed to find stock.' });
    });
});

  

  // DESTROY
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: new ObjectId(id) })
      .then(result => res.json(result))
      .catch(handleError);
  });

  // UPDATE
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    updatedData.totalShares = calculateTotalShares(updatedData);
    collection
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData })
      .then(result => res.json(result))
      .catch(handleError);
  });

  return router;
};

module.exports = createRouter;
