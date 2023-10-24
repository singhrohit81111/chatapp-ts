import { useState, useEffect, useRef } from "react";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, DocumentData, where, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { Timestamp } from 'firebase/firestore'; // Import FieldValue
import styles from '../styles/styles.module.css';
import whatsappBackground from '../assets/wtsapp.png'

type Message = {
  text: string;
  sender: string;
  name: string;
  timestamp: Timestamp;

  // other properties
};

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [name, setName] = useState("");
  const roomId = useSelector((state: any) => state.senderId);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (roomId) {
      fetchUsernameFromRoomId(roomId).then((res) => {
        console.log(res, "name");

        setName(res);
      });

      const firestore = getFirestore();
      const messagesCollection = collection(firestore, "messages"); // Store all messages in a single collection
      const q = query(messagesCollection, orderBy("timestamp"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messageList: Message[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as DocumentData;
          const message: Message = {
            text: data.text,
            sender: data.sender,
            name: data.name,
            timestamp: data.timestamp,
            // Include other properties if needed
          };
          messageList.push(message);
        });
        setMessages(messageList);
        ref.current?.scrollIntoView({ behavior: "smooth" });
      });

      return () => unsubscribe();
    }
  }, [roomId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const firestore = getFirestore();
      const messagesCollection = collection(firestore, "messages"); // Use the same collection for all messages

      await addDoc(messagesCollection, {
        text: newMessage,
        sender: roomId, // Include the sender (you can also use a unique user ID)
        timestamp: Timestamp.now(),
        name: name,
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  console.log(messages);

  return (
    <div className={styles.messages} style={{ backgroundImage: `url(${whatsappBackground})` }}>
      <div className={styles.messageList}>
        {messages.map((message, index) => (
          <div key={index} style={{ display: `flex`, justifyContent: roomId === message.sender ? `flex-end` : `flex-start` }} className={styles.message} ref={ref}>
            <div>{message.text}</div>
            <div className={styles.messageName}>-{message.name}</div>
            <div>{ }</div>
          </div>
        ))}
      </div>
      <div className={styles.messageInput}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className={styles.messagesInput}
        />
        <button onClick={sendMessage} className={styles.messagesButton}>Send</button>
      </div>
    </div>
  );
};

export default Messages;

async function fetchUsernameFromRoomId(roomId: string) {
  const firestore = getFirestore();
  const usersCollection = collection(firestore, "rooms"); // Replace "users" with the actual collection name
  const q = query(usersCollection, where("id", "==", roomId));
  const querySnapshot = await getDocs(q);
  console.log(roomId, querySnapshot.empty, q);

  if (!querySnapshot.empty) {
    // Assuming roomId is unique for each user
    const userDoc = querySnapshot.docs[0];
    console.log(userDoc);

    const userData = userDoc.data();
    return userData.name; // Replace "username" with the actual field name for username
  }

  return "HELLO"; // Return an empty string or handle the case when the user is not found
}