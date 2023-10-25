import  { useState } from 'react';
import { toast } from 'react-hot-toast';
import { requestPermission, onMessageListener } from '../firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import axios from 'axios';

// interface PayloadType {
//     notification?: {
//         title?: string;
//         body?: string;
//     };
// }

function Notification() {
    const [notification, setNotification] = useState({ title: 'Notifcation', body: 'You are invited to group' });

    const initializeNotifications = async () => {
        requestPermission();
        const firestore = getFirestore();
        const usersCollection = collection(firestore, "users",);
        const usersSnapshot = await getDocs(usersCollection);
        console.log(usersSnapshot, "users");
        const usersData = usersSnapshot.docs.map((doc) => ({
            fcm: doc.get("fcmToken"),
        }));
        const registrationTokens = usersData.map(e => e.fcm)
        console.log(usersData, registrationTokens, "fcm");
        // const notification = {
        //     title: "Notifcation",
        //     body: "You are invited to Group",
        // };
        const data = { title: "Notifcation", body: "You are invited to Group" };



        axios
            .post('https://chatapp-7tuy.onrender.com/send-notification', {
                registrationTokens,
                notification,
                data,
                tokenToExclude: "",
            })
            .then((response) => {
                console.log('Push notification sent:', response.data);
                if (response.status === 200) {
                    onMessageListener().then((payload: any) => {
                        console.log(payload, 'onMessageListenerpayload');
                        setNotification({
                            title: payload?.notification?.title,
                            body: payload?.notification?.body,
                        });
                        toast.success(
                            `${payload?.notification?.title}: ${payload?.notification?.body}`,
                            {
                                duration: 6000,
                                position: 'top-right',
                            }
                        );
                        console.log(
                            `${payload?.notification?.title}: ${payload?.notification?.body}`,"hee"
                        );
                    });
                }
            })
            .catch((error) => {
                console.error('Error sending push notification:', error);
            });

    };
    console.log(notification, "notify");

    return (
        <div>
            <button onClick={initializeNotifications}>Invite all</button>
        </div>
    );
}

export default Notification;







