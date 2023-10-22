import React, { useState } from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom';
import UsersList from './components/UsersList';
import Routtes from './routes/Routtes';


function App() {
  const [chatRoomId, setChatRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const createChatRoom = () => {
    if (chatRoomId.trim() !== '' && userName.trim() !== '') {
      setChatRoomId(chatRoomId);
    }
  };

  return (
    <div className="App">
      <Routtes/>
    </div>
  );
}

export default App;
