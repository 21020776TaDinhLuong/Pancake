import Fanpage from '../models/fanpageModel.js';
import express from 'express'
const router = express.Router()

// Tạo fanpage mới
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    try {
        const fanpage = new Fanpage({ name, description });
        await fanpage.save();
        res.status(201).json(fanpage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lấy danh sách tất cả fanpage
router.get('/', async (req, res) => {
    try {
        const fanpages = await Fanpage.find();
        res.status(200).json(fanpages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lấy fanpage theo ID
router.get('/:id', async (req, res) => {
    try {
        const fanpage = await Fanpage.findById(req.params.id).populate('posts');
        if (!fanpage) {
            return res.status(404).json({ message: 'Fanpage not found' });
        }
        res.status(200).json(fanpage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
