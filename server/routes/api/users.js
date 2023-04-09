const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

router.get('/test', (req, res) => res.send('User route testing!'));

// @route GET api/Items
// @description Get all Items
// @access Public
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});

// @route GET api/Items/:id
// @description Get single Item by id
// @access Public
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
});

router.get('/:username', (req, res) => {
  User.findById(req.params.username)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
});

// @route GET api/Items
// @description add/save Item
// @access Public
router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route GET api/Items/:id
// @description Update Item
// @access Public
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'User updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/Items/:id
// @description Delete Item by id
// @access Public
// router.delete('/:id', (req, res) => {
//   User.findByIdAndRemove(req.params.id, req.body)
//     .then(user => res.json({ mgs: 'User entry deleted successfully' }))
//     .catch(err => res.status(404).json({ error: 'User does not exist' }));
// });

module.exports = router;