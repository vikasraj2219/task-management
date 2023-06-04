import axios from 'axios'
import React, { useState } from 'react'

export const TaskInput = (props) => {
    console.log(props)
    const {id, fromAddTask, getAlltasks} = props

    const [formData, setFormData] = useState({
        title: '',
        description:'',
        due_date: '',
        is_complted:0
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    const addTask = (event) =>{

        event.preventDefault();

        if(fromAddTask){
            axios.post("http://localhost:5000/tasks", formData).then((response) => {
                alert("Task added successfully")
                getAlltasks()
                setFormData({
                    title: '',
                    description:'',
                    due_date: '',
                    is_complted:0
                  })
            });
        }
        else{
            axios.put(`http://localhost:5000/tasks/${id}`, formData).then((response) => {
                alert("Task updated successfully")
                getAlltasks()
                setFormData({
                    title: '',
                    description:'',
                    due_date: '',
                    is_complted:0
                  })
            }); 
        }
        
    }
    return (
        <>
            <form onSubmit={addTask} className='bg-light w-100 shadow-sm border border-dark mb-5 p-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control w-100 float-left" name="title" value={formData.title} onChange={handleInputChange} id="input-title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" id="input-desc" name="description" value={formData.description} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="due date" className="form-label">Due Date</label>
                    <input type="date" className="form-control" id="input-due" name="due_date" value={formData.due_date} onChange={handleInputChange} />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}
