import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskListComponent = ({ tasks }) => {
    let navigate = useNavigate();

    const handleComplete = async(id, val) => {
        try{
           let response = await axios.put(`https://notify-backend-brown.vercel.app/notify/editTask/${id}`,{completed: !val})
           let {data} = response;

        }
        catch(ex){
            console.log(ex);
        }
    }

    useEffect(()=> {

    }, [tasks?.completed])

    return (
        <div>
            <h2 className='text-xl font-bold underline m-2'>All Reminders :</h2>
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
        </div>
    );
};

export default TaskListComponent;
