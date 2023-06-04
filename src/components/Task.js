import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { TaskInput } from './TaskInput';
import { set } from 'mongoose';

export const Task = ({isEnabled, setIsEnabled, fromAddTask, setFromAddTask, searchTerm}) => {
  const [tasksList, setTasksList] = useState([]);
  const [currentId,setCurrentId] = useState(0);
  const [filteredTasks,setFilteredTasks] = useState([])

  const getAlltasks = () => {
    Axios.get('http://localhost:5000/tasks').then((response) => {
      setTasksList(response.data);
      console.log(response.data);
      setFilteredTasks(response.data);
    });
  }
  useEffect(() => {
    getAlltasks();
    
  }, []);

  useEffect(()=>{
    if(searchTerm == ""){
        setFilteredTasks(tasksList);
    }
    else{
        setFilteredTasks(tasksList.filter((task) => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return (
              task.title.toLowerCase().includes(lowerCaseSearchTerm) ||
              task.description.toLowerCase().includes(lowerCaseSearchTerm)
            );
          }));
    }
  },[searchTerm])

  const editById =(id) =>{

    setFromAddTask(false)
    setIsEnabled(true);
    setCurrentId(id);
    // Axios.get(`http://localhost:5000/tasks/${id}`).then((response) => {
    //   alert("updated task successfully");
    // });
  }

  const markCompleted = (id) => {
    Axios.put(`http://localhost:5000/tasks/completed/${id}`).then((response) => {
        alert("Task marked as completed");
        getAlltasks();
      });
  }

  const deleteById = (id) => {
    Axios.delete(`http://localhost:5000/tasks/${id}`).then((response) => {
      alert("deleted records successfully")
      getAlltasks();
    });
  }

  return (
    <>
    {isEnabled ? <TaskInput id={currentId} fromAddTask={fromAddTask} getAlltasks={getAlltasks}/> : null}
      <table id="example" className="table table-striped table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((val,index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{val.title}</td>
                    <td>{val.description}</td>
                    <td>{val.due_date}
                    {val.is_complete ==1 ? <button className='btn btn-sm btn-success ms-3'>complted</button>
                    
                    : (<><button className='btn btn-sm btn-warning ms-3'>pending</button>
<button className='btn btn-sm btn-outline-success ms-3' onClick={()=> markCompleted(val.id)}>Mark as completed</button> </>)}
                    </td>
                    <td className='text-center'>
                      <button className="btn btn-outline-primary" onClick={() => { editById(val.id); }}>
                        Edit
                      </button>
                    </td>
                    <td className='text-center'>
                      <button className="btn btn-outline-danger" onClick={() => { deleteById(val.id); }}>
                        Delete
                      </button>

                    </td>
                  </tr>
                </>
              )
          })}
        </tbody>
      </table>
    </>
  );
};

export default Task;