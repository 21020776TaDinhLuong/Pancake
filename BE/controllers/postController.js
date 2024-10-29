import Post from "../models/postModel";
async function createPost(content, fanpageId) {
    const post = new Post({ content, fanpage: fanpageId });
    await post.save();

    // Thêm post vào fanpage
    await Fanpage.findByIdAndUpdate(fanpageId, { $push: { posts: post._id } });
    return post;
}