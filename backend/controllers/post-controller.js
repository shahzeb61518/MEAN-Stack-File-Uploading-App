const Post = require('../models/post-model');

// Create a Post
exports.createPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body
  });
  // console.log(post);
  post.save().then(createdPost => {
    //  console.log(createdPost);
    res.status(201).json({
      message: "Post Created successfully",
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  }).catch(error => {
    res.status(500).json({
      message: "Creating Post failed!"
    })
  });
}

// Get Posts 
exports.getPosts = (req, res, next) => {
  Post.find().then(documents => {
    // console.log(documents);
    res.status(200).json({
      message: 'Posts fetched!!!',
      posts: documents
    });
  }).catch(error => {
    res.status(500).json({
      message: "Getting Post failed!"
    })
  });
}

// // Get Post by Id
exports.getPostById = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "post not found!" })
    }
  }).catch(error => {
    res.status(500).json({
      message: "Finding Post failed!"
    })
  });
}

// // Delete Post by Id
exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(
    result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not deleted!" });
      }
    }
  ).catch(error => {
    res.status(500).json({
      message: "Deleting Post failed!"
    })
  });
}

// Update Post 
exports.updatePost = (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    body: req.body.body
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Post Updated successfully!" });
      } else {
        res.status(401).json({ message: "Not updated!" });
      }
    }).catch(error => {
      res.status(500).json({
        message: "Updating Post failed!"
      })
    });
}