import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { requestPermission, onMessageListener } from '../firebase';

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
            try {
                const payload: PayloadType = await onMessageListener() as PayloadType;
                if (payload && payload.notification) {
                    console.log(payload.notification,"hi");
                    
                    setNotification({
                        title: payload.notification.title || '',
                        body: payload.notification.body || '',
                    });

                    toast.success(`${payload.notification.title}: ${payload.notification.body}`, {
                        duration: 60000,
                        position: 'top-right',
                    });
                }
            } catch (error) {
                console.log('failed: ', error);
            }
        };

        initializeNotifications();
    }, []);
    console.log(notification, "noitify");

    return (
        <div>
            <button onClick={notify}>Make me a toast</button>
            <Toaster />
        </div>
    );
}

export default Notification;
