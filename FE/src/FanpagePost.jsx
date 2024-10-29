import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts, createPost } from './actions/postActions';

const FanpagePost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const postList = useSelector((state) => state.postList);
    const { posts = [], loading, error } = postList;

    const postCreate = useSelector((state) => state.postCreate);
    const { success } = postCreate;

    const [content, setContent] = useState('');

    useEffect(() => {
        dispatch(listPosts(id));
    }, [dispatch, id, success]);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(id, content));
        setContent('');
    };

    return (
        <div className="container">
            <h1>Posts for Fanpage</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post here..."
                    required
                    style={{ width: '100%', height: '100px' }} // Thêm width và height cho textarea
                />
                <button type="submit">Create Post</button>
            </form>

            <h2>Posts</h2>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post._id}>
                            <p>{post.content}</p>
                            <small>Posted on: {new Date(post.createdAt).toLocaleString()}</small>
                        </li>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </ul>
        </div>
    );
};

export default FanpagePost;
