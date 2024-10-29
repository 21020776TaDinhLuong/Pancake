import React, { useState, useEffect } from 'react';
import ChatForm from './ChatForm';

const PAGE_ID = '486249207897308'; // Replace with your actual Page ID
const ACCESS_TOKEN = '581487780975903|lkzib3KQyL1Z3ebn8F1-p9YKIwA'; // Replace with your Page Access Token

const ChatWithFacebookAPI = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v15.0/${PAGE_ID}/conversations?access_token=${ACCESS_TOKEN}`
      );
      const data = await response.json();
      
      // Fetch message content for each conversation (requires additional API calls per conversation)
      const messagesData = await Promise.all(
        data.data.map(async (conversation) => {
          const convoResponse = await fetch(
            `https://graph.facebook.com/v15.0/${conversation.id}/messages?access_token=${ACCESS_TOKEN}`
          );
          const convoData = await convoResponse.json();
          return convoData.data; // Fetch individual messages for each conversation
        })
      );
      
      setMessages(messagesData.flat());
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v15.0/${PAGE_ID}/messages?access_token=${ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
          }),
        }
      );
      const data = await response.json();
      console.log('Message sent:', data);
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h3>Chat with Fanpage</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.from?.name || 'User'}:</strong> {msg.message || msg.text}
          </div>
        ))}
      </div>
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWithFacebookAPI;
