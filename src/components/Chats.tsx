import React, { useState, ChangeEvent } from 'react';

export default function Chats() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; user: string }[]>([]);
  const users: string[] = ['User 1', 'User 2', 'User 3']; // Replace with your user list.

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, user: 'You' }]);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <div className="user-list">
        <h3>Users</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div className="message-container">
        <div className="message-display">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleInputChange}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
