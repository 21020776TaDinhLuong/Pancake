import React, { useState, useEffect } from 'react';

const PAGE_ID = '486249207897308'; // Replace with your Page ID
const ACCESS_TOKEN = 'EAAIQ3CygVR8BO4go04leWFSWiejPiAQVw9xmhji4UOhBraZCjgEURY8XXs7LPTvmhzsXXafeaDNLClpsuBxQh7FOSJN2wM7QkA3nDVKbAhtEHOZAwkEW9VPKRWZB1SWeihVNCW2qrh6QuHr3KGMwASAfZAtDgZAMAfc4qXTYMUmLKi4qaBAyWMQAjdKmeT9c0'; // Replace with your Access Token

const FacebookPosts = () => {
  const [posts, setPosts] = useState([]); // Initialize with an empty array

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts from the Facebook Page
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v15.0/${PAGE_ID}/feed?fields=message,created_time,from,comments{from,message,created_time}&access_token=${ACCESS_TOKEN}`
      );
      const data = await response.json();
      setPosts(data.data || []); // Use an empty array if data.data is undefined
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <h3>Bài Viết và Bình Luận</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <h4>Tác giả: {post.from?.name}</h4>
            <p>Nội dung bài viết: {post.message}</p>
            <p>Thời gian tạo: {new Date(post.created_time).toLocaleString()}</p>

            {/* Display comments */}
            {post.comments && (
              <div style={{ marginTop: '10px', paddingLeft: '15px' }}>
                <h5>Bình luận:</h5>
                {post.comments.data.map((comment) => (
                  <div key={comment.id} style={{ marginBottom: '10px', borderTop: '1px solid #ccc', paddingTop: '5px' }}>
                    <p><strong>{comment.from?.name}:</strong> {comment.message}</p>
                    <p>Thời gian bình luận: {new Date(comment.created_time).toLocaleString()}</p>
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
