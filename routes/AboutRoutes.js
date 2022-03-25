const express = require('express');
const mongodb = require('mongodb');
const client = require('../config/mongoDb');
const router = express.Router();


const run = async () => {
    try {
        await client.connect();
        const db = client.db('Rotary');
        const collection = db.collection('About');

        // post a About Rotary post
        router.post('/', (req, res) => {
            const newBlog = {
                ...req.body,
            };
            // insert new About Rotary post into database
            collection.insertOne(newBlog, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: 'About Rotary added successfully' });
                }
            });
        });

        // update a About Rotary post
        router.put('/:id', (req, res) => {
            if (req.files) {
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
                            res.send({ message: 'About Rotary updated successfully' });
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
                            res.send({ message: 'About Rotary updated successfully' });
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
    } finally {
        //
    }
}
run().catch(console.dir);

module.exports = router;