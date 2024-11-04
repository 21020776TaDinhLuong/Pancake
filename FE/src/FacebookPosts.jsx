import React, { useState, useEffect } from 'react'; 
import './FacebookPosts.css'; // Assuming you have a CSS file for styles

const FacebookPosts = ({ pageId, accessToken }) => {
  const [users, setUsers] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [pageId, accessToken]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v21.0/${pageId}/feed?fields=comments{from}&access_token=${accessToken}`
      );
      const data = await response.json();
      const usersSet = new Set();

      // Collect unique users from comments
      data.data.forEach(post => {
        post.comments?.data.forEach(comment => {
          if (comment.from) {
            usersSet.add({ id: comment.from.id, name: comment.from.name });
          }
        });
      });

      setUsers(Array.from(usersSet)); // Convert Set to Array
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchChatHistory = async (userId) => {
    try {
      // Fetch conversations for the selected user
      const response = await fetch(
        `https://graph.facebook.com/v21.0/${pageId}/conversations?user_id=${userId}&access_token=${accessToken}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching conversations: ${errorData.error.message}`);
      }

      const data = await response.json();
      
      if (data.data) {
        const messages = await Promise.all(data.data.map(async (conversation) => {
          const messageResponse = await fetch(
            `https://graph.facebook.com/v21.0/${conversation.id}/messages?access_token=${accessToken}`
          );

          if (!messageResponse.ok) {
            const errorData = await messageResponse.json();
            throw new Error(`Error fetching messages: ${errorData.error.message}`);
          }

          const messageData = await messageResponse.json();

          return messageData.data.map(msg => ({
            text: msg.message?.text || '',
            timestamp: msg.created_time || new Date().toISOString(),
            isUser: msg.sender?.id === userId,
          }));
        }));

        setChatHistory(messages.flat()); // Flatten the array of messages
      } else {
        console.error('No conversations found:', data);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error.message);
    }
  };

  const sendMessage = async () => {
    if (chatUser && message) {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v2.6/me/messages?access_token=${accessToken}`,
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
          // Add the sent message to chat history
          setChatHistory(prev => [...prev, { text: message, timestamp: new Date(), isUser: true }]);
        } else {
          const errorData = await response.json();
          console.error('Error sending message:', errorData);
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
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id} className="user-item" onClick={() => {
              setChatUser(user);
              fetchChatHistory(user.id); // Fetch chat history using user ID
            }}>
              <p>{user.name}</p>
            </div>
          ))
        ) : (
          <p>Không có người dùng nào để hiển thị.</p>
        )}
      </div>

      <div className="chat-window">
        {chatUser ? (
          <>
            <h4>Chat với {chatUser.name}</h4>
            <div className="chat-history">
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
