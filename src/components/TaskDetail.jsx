import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  const [detail, setDetail] = useState({});

  const { id } = useParams();
    useEffect(()=> {
  async function fetchDetail(){
    try{
        let response = await axios.get(`https://notify-backend-brown.vercel.app/notify/getTaskDetail/${id}`)
        let {data} = response;
        setDetail(data[0]);
    }
    catch(ex){
        console.group(ex);
    }
        }
      fetchDetail();
    },[id])
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className='flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-lg'>
        <h1 className='text-xl font-bold underline m-2'>Task Detail</h1>
        <p><span className='font-bold'>Title: </span>{detail?.title}</p>
        <p><span className='font-bold'>Description: </span>{detail?.description}</p>
        <p><span className='font-bold'>Notification Time: </span>{detail?.notificationTime}</p>
    </div>
</div>

  )
}

export default TaskDetail