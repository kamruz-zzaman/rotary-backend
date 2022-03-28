const express = require('express');
const mongodb = require('mongodb');
const client = require('../config/mongoDb');
const router = express.Router();

const db = client.db('Rotary');
const collection = db.collection('Project');

// post a project
router.post('/', (req, res) => {
    const newBlog = {
        ...req.body
    };
    // insert new project into database
    collection.insertOne(newBlog, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'Project added successfully' });
        }
    });
});

// update a project
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
                    res.send({ message: 'Project updated successfully' });
                }
            }
        );
    } else {
        const updatedBlog = {
            ...req.body,
        };
        // update project in database
        collection.updateOne(
            { _id: new mongodb.ObjectId(req.params.id) },
            { $set: updatedBlog },
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ message: 'Project updated successfully' });
                }
            }
        );
    }
});

// get all projects
router.get('/', (req, res) => {
    collection
        .find({})
        .sort({ _id: -1 })
        .toArray((err, projects) => {
            if (err) {
                res.send(err);
            } else {
                res.send(projects);
            }
        });
});

// get a single project
router.get('/:id', (req, res) => {
    collection.findOne(
        { _id: new mongodb.ObjectId(req.params.id) },
        (err, project) => {
            if (err) {
                res.send(err);
            } else {
                res.send(project);
            }
        }
    );
});

// delete a project
router.delete('/:id', (req, res) => {
    collection.deleteOne(
        { _id: new mongodb.ObjectId(req.params.id) },
        (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'Project deleted successfully' });
        }
    );
});

module.exports = router;
