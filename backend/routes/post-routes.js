const express = require('express');
const router = express.Router();
const postController = require('../controllers/post-controller');

// Create a Post
router.post('', postController.createPost);

// Get Posts 
router.get('', postController.getPosts);

// Get Post by Id
router.get('/:id', postController.getPostById);

// Delete Post by Id
router.put("/:id", postController.updatePost)

// Delete Post by Id
router.delete("/:id", postController.deletePost)

module.exports = router;
