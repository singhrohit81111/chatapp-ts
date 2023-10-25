import { useState } from 'react';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { setSenderId } from '../services/redux/actions';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/styles.module.css';
import { BiSolidLockAlt } from 'react-icons/bi';
import Notification from '../components/Notification';


const ChatRoom = () => {
    const [roomName, setRoomName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleJoinRoom = async () => {
        try {
            // Generate a random UUID
            const roomId = uuidv4();

            // Create a reference to the Firestore document within the "rooms" collection


            await setDoc(doc(db, "rooms", roomId), {
                name: roomName,
                id: roomId,

            });
            dispatch(setSenderId(roomId));
            navigate("/messages")
            1
            // Redirect or navigate to the chat room using the roomId
            // You can use React Router or other navigation methods
            console.log('Room ID:', roomId);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };
    
    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <h1>Join a Chat Room</h1>
                <div><BiSolidLockAlt className={styles.icon} /></div>
                <input
                    type="text"
                    placeholder="Enter Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className={styles.homeInput}
                />
                <button onClick={handleJoinRoom} className={styles.homeButton}>Join Room</button>
               
                <Notification />
            </div>
        </div>
    );
};

export default ChatRoom;
