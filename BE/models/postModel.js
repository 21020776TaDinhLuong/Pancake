// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    fanpage: { type: mongoose.Schema.Types.ObjectId, ref: 'Fanpage', required: true }
});

const Post = mongoose.model('Post', postSchema);
export default Post;
