import React, { useState, useEffect } from 'react';

const ChatFanpage = () => {
  const [messages, setMessages] = useState([]);
  const pageId = '61568079806617'; // Replace with your page ID

  useEffect(() => {
    // Fetch messages for the page here using the Facebook Graph API or a similar service
    // Example: fetch messages using an API call and update `messages` state
    // This example uses mock data for demonstration
    setMessages([
      { id: 1, sender: 'User', text: 'Hi', time: '18:10' },
      { id: 2, sender: 'Page', text: 'Hi there!', time: '18:15' }
    ]);
  }, []);

  const handleReply = (message) => {
    // Implement reply functionality here, such as calling the Facebook API to post a reply
    console.log(`Replying to message: ${message}`);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '400px' }}>
      <h3>Chat with Page</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ margin: '10px 0', padding: '5px', backgroundColor: msg.sender === 'User' ? '#e0e0e0' : '#cfe9ff', borderRadius: '5px' }}>
            <strong>{msg.sender}</strong> <span style={{ fontSize: '0.8em', color: '#666' }}>{msg.time}</span>
            <p>{msg.text}</p>
            {msg.sender === 'User' && (
              <button onClick={() => handleReply(msg.text)}>Reply</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatFanpage;
