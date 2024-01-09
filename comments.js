// Create web server
var express = require('express');
var router = express.Router();

// Import model
var Comment = require('../models/comment');

// Get all comments
router.get('/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});

// Get single comment by id
router.get('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
});

// Add new comment
router.post('/', function(req, res) {
    var comment = new Comment();
    comment.text = req.body.text;
    comment.author = req.body.author;

    comment.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Comment successfully added!' });
    });
});

// Update comment
router.put('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            res.send(err);
        }
        comment.text = req.body.text;
        comment.author = req.body.author;

        comment.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Comment successfully updated!' });
        });
    });
});

// Delete comment
router.delete('/:id', function(req, res) {
    Comment.remove({ _id: req.params.id }, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Comment successfully deleted!' });
    });
});

// Export router
module.exports = router;
