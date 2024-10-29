import React, { useState } from 'react';

const ChatForm = ({ onSendMessage }) => {
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText); // Call parent function to send message
      setMessageText(''); // Clear input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        style={{ width: '80%', padding: '10px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '10px' }}>Send</button>
    </form>
  );
};

export default ChatForm;
