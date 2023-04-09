const express = require('express');
const router = express.Router();

// Load Product model
const Product = require('../../models/Product');

router.get('/test', (req, res) => res.send('Product route testing!'));

// @route GET api/Items
// @description Get all Items
// @access Public
router.get('/', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(404).json({ noproductsfound: 'No products found.' }));
});

// @route GET api/Items/:id
// @description Get single Item by id
// @access Public
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ noproductfound: 'No product found' }));
});

router.get('/:productName', (req, res) => {
  Product.findById(req.params.productName)
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ noproductfound: 'No product found' }));
});

// @route GET api/Items
// @description add/save Item
// @access Public
router.post('/', (req, res) => {
  Product.create(req.body)
    .then(product => res.json({ msg: 'Product added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this product' }));
});

// @route GET api/Items/:id
// @description Update Item
// @access Public
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(product => res.json({ msg: 'Product updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/Items/:id
// @description Delete Item by id
// @access Public
// router.delete('/:id', (req, res) => {
//   Product.findByIdAndRemove(req.params.id, req.body)
//     .then(product => res.json({ mgs: 'Product entry deleted successfully' }))
//     .catch(err => res.status(404).json({ error: 'Product does not exist' }));
// });

module.exports = router;