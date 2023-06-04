import React, { useState } from 'react'

export const Search = ({ setIsEnabled, setFromAddTask, setSearchTerm, searchTerm }) => {

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };
    const setAddTask = () => {
        setIsEnabled(true);
        setFromAddTask(true);
    }
    return (
        <>
            <div className='container d-flex align-items-center justify-content-center flex-column'>
                <h1 className='text-center mb-3'>Task Management System</h1>
                <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    placeholder="Search by title or description"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button className='btn btn-info mt-3 mb-3' onClick={setAddTask}>Add Task</button>

            </div>

        </>
    )
}
