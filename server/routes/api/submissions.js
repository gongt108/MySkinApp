const express = require('express');
const router = express.Router();

const Submission = require('../../models/Submission');

router.get('/test', (req, res) => res.sendStatus('Submission route testing!'));

router.get('/', (req, res) => {
	Submission.find()
		.then((submissions) => res.json(submissions))
		.catch((err) =>
			res.status(404).json({ nosubmissionsfound: 'No submissions found.' })
		);
});

router.post('/', (req, res) => {
	Submission.create(req.body)
		.then((submission) => res.json({ msg: 'Submission added successfully. ' }))
		.catch((err) =>
			res.status(400).json({ error: 'Error submitting product.' })
		);
});

module.exports = router;
