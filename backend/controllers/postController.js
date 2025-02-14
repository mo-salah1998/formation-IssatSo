const Post = require('../models/PostModel');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        // Create a new Post document
        const newPost = await Post.create({
            title,
            content,
            author,
            reactions: {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            }
        });

        res.status(201).json({
            message: 'Post created successfully!',
            data: newPost,
        });
    } catch (error) {
        console.error(error.message )
        res.status(500).json({ message: 'Error creating post'});
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email'); // Populate author details
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author', 'name email');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
            message: 'Post updated successfully!',
            data: updatedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating post' });
    }
};

// Update reactions for a post
exports.updateReactions = async (req, res) => {
    try {
        const { id } = req.params;
        const { reaction } = req.body; // e.g., { reaction: 'thumbsUp' }

        // Check if the reaction type is valid
        const validReactions = ['thumbsUp', 'wow', 'heart', 'rocket', 'coffee'];
        if (!validReactions.includes(reaction)) {
            return res.status(400).json({ message: 'Invalid reaction type' });
        }

        // Increment the specified reaction
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $inc: { [`reactions.${reaction}`]: 1 } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
            message: 'Reaction updated successfully!',
            data: updatedPost,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating reactions', error: error.message });
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error deleting post' });
    }
};