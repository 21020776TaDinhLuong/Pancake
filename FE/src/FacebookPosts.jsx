import React, { useState, useEffect } from 'react';

const FacebookPosts = ({ pageId, accessToken }) => {
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    fetchPosts();
  }, [pageId, accessToken]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v21.0/${pageId}/feed?fields=message,created_time,from,comments{from,message,created_time,comments{from,message,created_time}}&access_token=${accessToken}`
      );
      const data = await response.json();
      setPosts(data.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleReplyChange = (commentId, value) => {
    setReplies((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleReplySubmit = async (commentId) => {
    const reply = replies[commentId];
    if (reply) {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v21.0/${commentId}/comments?message=${encodeURIComponent(reply)}&access_token=${accessToken}`,
          { method: 'POST' }
        );

        if (response.ok) {
          setReplies((prev) => ({ ...prev, [commentId]: '' }));
          fetchPosts(); // Refresh posts to show the new reply
        } else {
          const errorData = await response.json();
          console.error('Error submitting reply:', errorData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h3>Bài Viết và Bình Luận</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <h4>Tác giả: {post.from?.name || 'Người dùng'}</h4>
            <p>Nội dung bài viết: {post.message || ''}</p>
            <p>Thời gian tạo: {new Date(post.created_time).toLocaleString()}</p>

            {post.comments && post.comments.data.length > 0 && (
              <div style={{ marginTop: '10px', paddingLeft: '15px' }}>
                <h5>Bình luận:</h5>
                {post.comments.data.map((comment) => (
                  <div key={comment.id} style={{ marginBottom: '10px', borderTop: '1px solid #ccc', paddingTop: '5px' }}>
                    <p><strong>{comment.from?.name || 'Người dùng'}:</strong> {comment.message || ''}</p>
                    <p>Thời gian bình luận: {new Date(comment.created_time).toLocaleString()}</p>

                    {comment.comments && comment.comments.data.length > 0 && (
                      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                        <h6>Phản hồi:</h6>
                        {comment.comments.data.map((reply) => (
                          <div key={reply.id} style={{ marginBottom: '5px', borderTop: '1px dashed #ccc', paddingTop: '5px' }}>
                            <p><strong>{reply.from?.name || 'Người dùng'}:</strong> {reply.message || ''}</p>
                            <p>Thời gian phản hồi: {new Date(reply.created_time).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <input
                      type="text"
                      placeholder="Trả lời..."
                      value={replies[comment.id] || ''}
                      onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                    />
                    <button onClick={() => handleReplySubmit(comment.id)}>Gửi</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Không có bài viết nào để hiển thị.</p>
      )}
    </div>
  );
};

export default FacebookPosts;