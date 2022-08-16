import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { fetchToken, onMessageListener } from '../firebase';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';



export default function PushNotification(props) {
    const [show, setShow] = useState(false);
    const [notificaiton, setNotificaiton] = useState({ title: '', body: '' });
    const [getFcmToken, setFcmToken] = useState('');
    const toastTL = useRef(null);

    const showTopLeft = () => {
        toastTL.current.show({ severity: 'info', summary: notificaiton.title, detail: notificaiton.body, sticky: true });
    };

    useEffect(() => {
        if (notificaiton?.title) {
            showTopLeft()
        }
    }, [notificaiton])

    fetchToken(setFcmToken);
    onMessageListener()
        .then((payload) => {
            setNotificaiton({ title: payload?.notification?.title, body: payload?.notification?.body });
            setShow(true);
        })
        .catch((err) => console.log('failed: ', err));
    return (

        <Toast ref={toastTL} position="top-left" />

    );
}
