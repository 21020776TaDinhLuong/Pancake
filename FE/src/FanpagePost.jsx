import React, { useState, useEffect } from 'react';
import './FacebookPosts.css'; // Assuming you have a CSS file for styles

const FacebookPosts = ({ pageId, accessToken }) => {
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState({});
  const [chatUser, setChatUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

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

  const fetchChatHistory = async (userId) => {
    // Fetch chat history from your backend or Messenger API if applicable
    // Implement this function based on your setup
    // Example: setChatHistory(fetchedChatHistory);
  };

  const sendMessage = async () => {
    if (chatUser && message) {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v21.0/me/messages?access_token=${accessToken}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipient: { id: chatUser.id },
              message: { text: message },
            }),
          }
        );

        if (response.ok) {
          setMessage(''); // Clear message input
          fetchChatHistory(chatUser.id); // Refresh chat history
        } else {
          const errorData = await response.json();
          if (errorData.error.code === 551) {
            alert("Người dùng hiện không có mặt. Hãy yêu cầu họ nhắn tin cho bạn trước.");
          } else {
            console.error('Error sending message:', errorData);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="facebook-posts">
      <div className="sidebar">
        <h3>Danh sách người dùng</h3>
        {posts.map((post) => (
          post.comments && post.comments.data.map((comment) => (
            <div key={comment.id} className="user-item">
              <p>{comment.from?.name || 'Người dùng'}</p>
              <button onClick={() => { 
                setChatUser({ id: comment.from.id, name: comment.from.name });
                fetchChatHistory(comment.from.id); 
              }}>Chat</button>
            </div>
          ))
        ))}
      </div>

      <div className="chat-window">
        {chatUser ? (
          <>
            <h4>Chat với {chatUser.name}</h4>
            <div className="chat-history">
              {/* Render chat history */}
              {chatHistory.map((msg, index) => (
                <div key={index} className={msg.isUser ? 'user-message' : 'bot-message'}>
                  <p>{msg.text}</p>
                  <p>{new Date(msg.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Nhắn tin..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Gửi</button>
          </>
        ) : (
          <p>Chọn một người dùng để bắt đầu trò chuyện.</p>
        )}
      </div>
    </div>
  );
};

export default FacebookPosts;
