const Post = require("../model/postModel")
const MyError = require('../utils/myError')


exports.createPost = async (req, res, next) => {
    try {
        const {  title, content, categories } = req.body;
        const fileName = req.file.filename;
        const newPost = await Post.create(
            {
                image: fileName,
                title: title,
                content: content,
                categories: categories,
            }
        );

        res.status(200).json({
            success: true,
            newPost: newPost
        })
    } catch (error) {
        console.error(error);
        throw new MyError(`Cannot create new post: ${error.message}`, 403);
    }
}


exports.getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        throw MyError('Internal server error', 403)
    }
};


exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            res.status(200).json({
                success: true,
                post
            });
        } else {
            throw new MyError(`${req.params.id} is not valid`, 403);
        }
    } catch (error) {
        throw MyError(`${req.params.id} is not valid`, 403)
    }
}

exports.deletePost = async (req, res, next) => {
    const userId = req.userId
    console.log(userId);
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Unauthorized: You need to log in to delete posts' });
        }

        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized: You can only delete your own posts' });
        }

        const deletedPost= await Post.findByIdAndDelete(postId);

        res.status(200).json({
            success: true,
            deletedPost 
        });

    } catch (error) {
        throw new MyError(`${req.params.id} is not valid`, 403);
    }
};



exports.updatePost= async (req, res, next) => {
    const userId = req.userId
    console.log(userId);
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Unauthorized: You need to log in to update posts' });
        }

        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized: You can only update your own posts' });
        }

        const updates = {
            image: req.body.fileName,
            title: req.body.title,
            content: req.body.content,
            categories: req.body.categories,

        };

        if (req.file) {
            updates.image = req.file.filename;
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, updates, { new: true });

        if (!updatedPost) {
            throw new MyError(`${postId} is not a valid post id`, 404);
        }

        res.status(200).json({
            success: true,
            updatedPost
        });
    } catch (error) {
        throw new MyError(`Error updating post: ${error.message}`, 403);
    }
};