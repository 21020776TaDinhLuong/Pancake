import Post from '../models/postModel.js'
import express from 'express'
const router = express.Router()

// Tạo post mới cho fanpage
router.post('/', async (req, res) => {
    const { content, fanpageId } = req.body;
    try {
        const post = new Post({ content, fanpage: fanpageId });
        await post.save();
        
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lấy tất cả post của fanpage
router.get('/:fanpageId', async (req, res) => {
    try {
        const posts = await Post.find({ fanpage: req.params.fanpageId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy post theo ID
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
