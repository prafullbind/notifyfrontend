import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import http from "../components/httpServices/httpService";

const TaskListComponent = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);


    const handleComplete = async(id, val) => {
        try{
        //    let response = await axios.put(`https://notify-backend-brown.vercel.app/notify/editTask/${id}`,{completed: !val});
        let response = await axios.put(`http://localhost:2410/notify/editTask/${id}`,{completed: !val})
           let {data} = response;
        }
        catch(ex){
            console.log(ex);
        }
    }

    const fetchTasks = async () => {
        try {
            // const response = await axios.get('https://notify-backend-brown.vercel.app/notify/getTask');
            const response = await http.get(`/getUserTask/${id}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(()=> {
      fetchTasks();
    }, [tasks?.completed])

    return (
        <div className='flex justify-center items-center flex-col'>
            <h2 className='text-xl font-bold underline m-2'>All Reminders :</h2>
            {tasks.length>0 ? 
            <table className='border p-3'>
                <tr className='border p-3'>
                    <th className='border p-2'>Title</th>
                    <th className='border p-2'>Description</th>
                    <th className='border p-2'>Notification time</th>
                    <th className='border p-3'></th>
                    {/* <th className='border p-3'></th> */}

                </tr>
                {tasks.map((task) => (
                    <tr key={task._id}>
                    <td className='border p-2'>{task.title}</td>
                    <td className='border p-2'>{task.description}</td>
                    <td className='border p-2'>{task.notificationTime}</td>
                    <td className='border p-3'>
                        <button className='bg-green-600 text-white px-3 py-1 rounded-sm' onClick={()=> navigate(`/task-details/${task._id}`) }>Details</button>
                    </td>
                    {/* <td className='border p-3'>
                        <button className='bg-green-600 text-white px-3 py-1 rounded-sm' onClick={()=> handleComplete(task._id, task?.completed)}>{task?.completed ? "Mark Incomplete" : "Mark Complete"}</button>
                    </td> */}
                    </tr>
                ))}
            </table>
            : "There is no task"}
        </div>
    );
};

export default TaskListComponent;
