import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { requestPermission, onMessageListener } from '../firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import axios from 'axios';

interface PayloadType {
    notification?: {
        title?: string;
        body?: string;
    };
}

function Notification() {
    const [notification, setNotification] = useState({ title: '', body: '' });
    const notify = () => toast("HELLO");

    useEffect(() => {
        requestPermission();

        const initializeNotifications = async () => {

            const firestore = getFirestore();
            const usersCollection = collection(firestore, "users",);
            const usersSnapshot = await getDocs(usersCollection);
            console.log(usersSnapshot, "users");
            const usersData = usersSnapshot.docs.map((doc) => ({
                fcm: doc.get("fcmToken"),
            }));
            const fcm = usersData.map(e => e.fcm)
            console.log(usersData, fcm, "fcm");
            const notification = {
                title: "Notifcation",
                body: "You are invited to Group",
            };
            const data = { title: "Notifcation", body: "You are invited to Group" };



            const payload: PayloadType = await onMessageListener() as PayloadType;
            if (payload && payload.notification) {

                setNotification({
                    title: payload.notification.title || '',
                    body: payload.notification.body || '',
                });

                toast.success(`${payload.notification.title}: ${payload.notification.body}`, {
                    duration: 60000,
                    position: 'top-right',
                });
            }

        };

        initializeNotifications();
    }, []);
    console.log(notification, "notify");

    return (
        <div>
            <Toaster />
        </div>
    );
}

export default Notification;







