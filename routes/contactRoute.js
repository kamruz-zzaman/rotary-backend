const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const client = require('../config/mongoDb');

var time = new Date((new Date().getTime() + (new Date().getTimezoneOffset() * 60000)) + (3600000 * +5.5)).toLocaleString();

const run = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db('Rotary');
        const collection = db.collection('Messeges');

        // post a Contact from message
        router.post('/', (req, res) => {
            const message = {
                ...req.body,
                messageTime: time,
            };
            // insert new message into database
            collection.insertOne(message, (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: 'Message added successfully' });
                }
            });
        });

        // get all message
        router.get('/', (req, res) => {
            collection
                .find({})
                .sort({ _id: -1 })
                .toArray((err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });
        });

        //  Delete a  message by id
        router.delete('/:id', (req, res) => {
            collection.deleteOne(
                { _id: new mongodb.ObjectId(req.params.id) },
                (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({ message: 'Message deleted successfully' });
                    }
                }
            );
        });
    } catch (error) {
        console.log(error);
    }
};

run().catch(console.error);

module.exports = router;
