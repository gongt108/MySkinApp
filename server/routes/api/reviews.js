const express = require('express');
const router = express.Router();

const Review = require('../../models/Review');

router.get('/test', (req, res) => res.send('Review router testing!'));

router.get('/', (req, res) => {
	Review.find()
		.then((reviews) => res.json(reviews))
		.catch((err) =>
			res.status(404).json({ noreviewsfound: 'No reviews found' })
		);
});

router.get('/:id', (req, res) => {
	Review.findById(req.params.id)
		.then((review) => res.json(review))
		.catch((err) => res.status(404).json({ noreviewfound: 'No review found' }));
});

router.post('/', (req, res) => {
	Review.create(req.body)
		.then((review) => res.json({ msg: 'Review added successfully' }))
		.catch((err) =>
			res.status(400).json({ error: 'Unable to add this review' })
		);
});

router.put('/:id', (req, res) => {
	Review.findByIdAndUpdate(req.params.id, req.body)
		.then((review) => res.json({ msg: 'Review updated successfully' }))
		.catch((err) =>
			res.status(400).json({ error: 'Unable to update the Database' })
		);
});

router.delete('/:id', (req, res) => {
	Review.findByIdAndRemove(req.params.id, req.body)
		.then((review) => res.json({ mgs: 'Review entry deleted successfully' }))
		.catch((err) => res.status(404).json({ error: 'Review does not exist' }));
});

module.exports = router;
