import React, { useState, useEffect } from 'react';

const ACCESS_TOKEN = 'EAAPSeUzxw7wBOyP2qIKPG5fosNgsCcOSwgYoJOwLBJF0YCZAUvYdcQ0eAG6gZBz4O21ugcIfz2v7nCFWVsaR3M4P7AjebLZB0DiRi5gYuFpZB8xZBkojtFDdae1COZCewI8WI0vagTdmP0IW839EMgS1CYuDRNZBnXMFZBQ0By4ZAZB0y39MpZBe4WD3V8fZAUfw0gQj'; // Thay thế bằng mã truy cập của bạn

const FacebookPosts = ({ pageId }) => {
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState({}); // Quản lý phản hồi

  useEffect(() => {
    fetchPosts();
  }, [pageId]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v21.0/${pageId}/feed?fields=message,created_time,from,comments{from,message,created_time,comments{from,message,created_time}}&access_token=${ACCESS_TOKEN}`
      );
      const data = await response.json();
      console.log(data); // In ra dữ liệu để kiểm tra
      setPosts(data.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Xử lý thay đổi phản hồi
  const handleReplyChange = (commentId, value) => {
    setReplies((prev) => ({ ...prev, [commentId]: value }));
  };

  // Xử lý gửi phản hồi
  const handleReplySubmit = async (commentId) => {
    const reply = replies[commentId];
    if (reply) {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v21.0/${commentId}/comments?message=${reply}&access_token=${ACCESS_TOKEN}`,
          {
            method: 'POST',
          }
        );

        if (response.ok) {
          console.log(`Reply submitted: ${reply}`);
          setReplies((prev) => ({ ...prev, [commentId]: '' })); // Xóa input
          fetchPosts(); // Làm mới bài viết để hiển thị phản hồi mới
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
            <h4>Tác giả: {post.from?.name || ''}</h4>
            <p>Nội dung bài viết: {post.message || ''}</p>
            <p>Thời gian tạo: {new Date(post.created_time).toLocaleString()}</p>

            {post.comments && post.comments.data.length > 0 && (
              <div style={{ marginTop: '10px', paddingLeft: '15px' }}>
                <h5>Bình luận:</h5>
                {post.comments.data.map((comment) => (
                  <div key={comment.id} style={{ marginBottom: '10px', borderTop: '1px solid #ccc', paddingTop: '5px' }}>
                    <p><strong>{comment.from?.name || ''}:</strong> {comment.message || ''}</p>
                    <p>Thời gian bình luận: {new Date(comment.created_time).toLocaleString()}</p>

                    {/* Hiển thị phản hồi cho bình luận */}
                    {comment.comments && comment.comments.data.length > 0 && (
                      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                        <h6>Phản hồi:</h6>
                        {comment.comments.data.map((reply) => (
                          <div key={reply.id} style={{ marginBottom: '5px', borderTop: '1px dashed #ccc', paddingTop: '5px' }}>
                            <p><strong>{reply.from?.name || ''}:</strong> {reply.message || ''}</p>
                            <p>Thời gian phản hồi: {new Date(reply.created_time).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Input để trả lời bình luận */}
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
