// models/Fanpage.js
import mongoose from "mongoose";

const fanpageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const Fanpage = mongoose.model('Fanpage', fanpageSchema);
export default Fanpage;
