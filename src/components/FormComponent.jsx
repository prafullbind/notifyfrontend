import React, { useState, useEffect } from 'react';
import TaskListComponent from './TaskListComponent';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import auth from "../components/httpServices/auth";
import http from "../components/httpServices/httpService";
import { useNavigate } from 'react-router-dom';


const user = auth.getUser();

// Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNSN7aVdmPZMk0TOykTVs7_8B2r4HzetI",
    authDomain: "notifytask-ff85e.firebaseapp.com",
    projectId: "notifytask-ff85e",
    storageBucket: "notifytask-ff85e.appspot.com",
    messagingSenderId: "419957352088",
    appId: "1:419957352088:web:6d83e47c8803eff5fa12ed"
  };
  

const FormComponent = () => {
    const [formData, setFormData] = useState({ title: '', description: '', notificationTime: '' });
    const [fcmToken, setFcmToken] = useState(null);
    const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(false);
    const navigate = useNavigate();



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const convertToIST = (dateTimeString) => {
        const date = new Date(dateTimeString); // Parse datetime string into Date object
        const ISTOffset = 330; // Offset for Indian Standard Time (IST) in minutes
        const adjustedDate = new Date(date.getTime() + ISTOffset * 60000); // Adjust datetime by adding IST offset
        return adjustedDate.toISOString().slice(0, 16); // Format adjusted datetime as yyyy-MM-ddTHH:mm and return
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.fcm = fcmToken || "";
        formData.notificationTime = convertToIST(formData.notificationTime); // Convert to IST
        formData.createdBy = user?._id;
        try {
            // await axios.post('https://notify-backend-brown.vercel.app/notify/addtask', formData);
            await http.post('/addtask', formData);
            setFormData({ title: '', description: '', notificationTime: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    };

   

    const getFCMToken = async (messaging) => {
        try {
          const token = await getToken(messaging, { vapidKey: 'BED4IWQBN00_x7f5tSqegTvaGMtCihPRM7ZDRx10k8ceyQVH4pcrR7t41L94xFB1mKhlgLaRoPbyRQpnXCNv7FY' }); // Include VAPID key for web push
          setFcmToken(token);
    
          // Send the token to your server for secure storage
          // (implementation details depend on your backend setup)
          console.log('FCM Token:', token); // For development purposes only (remove in production)
        //   await sendTokenToServer(token);
        } catch (error) {
          console.error('Error getting token:', error);
        }
      };

    useEffect(() => {
        const requestPermission = async () => {
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);
            const permission = await Notification.requestPermission();
            setNotificationPermissionGranted(permission === 'granted');
    
            if(permission === "granted"){
                getFCMToken(messaging);
               }
               else if(permission === "denied"){
                alert('You denied for the notification');
               }
          };
      
          requestPermission();
    }, []);


    return (
        <div className='flex justify-center items-center flex-col'>
        <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleSubmit} className='bg-gray-200 p-8 rounded-lg shadow-lg'>
        <h1 className='text-xl font-bold m-2'>Create your task</h1>
            <label className='font-bold w-full mb-2'>Title:</label>
            <input className='border px-2 py-1 w-full mb-4 rounded-sm' type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
    
            <label className='font-bold w-full mb-2'>Description:</label>
            <textarea className='border px-2 py-1 w-full mb-4 rounded-sm' rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
    
            <label className='font-bold w-full mb-2'>Time:</label>
            <input className='border px-2 py-1 w-full mb-4 rounded-sm' type="datetime-local" name="notificationTime" value={formData.notificationTime} onChange={handleChange} required />
    
            <button className='border px-4 py-2 bg-blue-700 text-white rounded-md' type="submit">Add Reminder</button>
        </form>
    </div>
    <button className='px-4 py-2 border bg-blue-500 text-white rounded-md' onClick={() => navigate(`/view/all-task/${user._id}`)}>View all task</button>
    </div>
    );
};

export default FormComponent;
