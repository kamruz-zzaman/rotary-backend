const express = require('express');
const mongodb = require('mongodb');
const client = require('../config/mongoDb');
const router = express.Router();

const time = new Date(
	new Date().getTime() + new Date().getTimezoneOffset() * 60000 + 3600000 * +5.5
).toLocaleString();

const db = client.db('Rotary');
const collection = db.collection('blogs');

// post a blog
router.post('/', (req, res) => {
	const encodedImage = req.files.image.data.toString('base64');
	const image = Buffer.from(encodedImage, 'base64');
	const newBlog = {   
		...req.body,
		createdAt: time,
		image,
	};
	// insert new blog into database
	collection.insertOne(newBlog, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send({ message: 'Blog added successfully' });
		}
	});
});

// update a blog
router.put('/:id', (req, res) => {
	if (req.files) {
		const encodedImage = req.files.image.data.toString('base64');
		const image = Buffer.from(encodedImage, 'base64');
		const updatedBlog = {
			...req.body,
			image,
		};
		// update blog in database
		collection.updateOne(
			{ _id: new mongodb.ObjectId(req.params.id) },
			{ $set: updatedBlog },
			(err, result) => {
				if (err) {
					res.send(err);
				} else {
					res.send({ message: 'Blog updated successfully' });
				}
			}
		);
	} else {
		const updatedBlog = {
			...req.body,
		};
		// update blog in database
		collection.updateOne(
			{ _id: new mongodb.ObjectId(req.params.id) },
			{ $set: updatedBlog },
			(err, result) => {
				if (err) {
					res.send(err);
				} else {
					res.send({ message: 'Blog updated successfully' });
				}
			}
		);
	}
});

// get all blogs
router.get('/', (req, res) => {
	collection
		.find({})
		.sort({ _id: -1 })
		.toArray((err, blogs) => {
			if (err) {
				res.send(err);
			} else {
				res.send(blogs);
			}
		});
});

// get a single blog
router.get('/:id', (req, res) => {
	collection.findOne(
		{ _id: new mongodb.ObjectId(req.params.id) },
		(err, blog) => {
			if (err) {
				res.send(err);
			} else {
				res.send(blog);
			}
		}
	);
});

// delete a blog
router.delete('/:id', (req, res) => {
	collection.deleteOne(
		{ _id: new mongodb.ObjectId(req.params.id) },
		(err, result) => {
			if (err) {
				res.send(err);
			}
			res.send({ message: 'Blog deleted successfully' });
		}
	);
});
// find all blogs by a specific author
router.get('/author/:author', (req, res) => {
	collection.find({ author: req.params.author }).toArray((err, blogs) => {
		if (err) {
			res.send(err);
		}
		res.send(blogs);
	});
});

module.exports = router;
