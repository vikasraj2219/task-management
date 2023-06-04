import { useState } from 'react';
import './App.css';
import Task from "./components/Task";
import { TaskInput } from './components/TaskInput';
import { Search } from './Search';

function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [fromAddTask,setFromAddTask] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  
  return (
   <>
   <div className='container d-flex align-items-center flex-column'>
          <Search setIsEnabled={setIsEnabled} setFromAddTask={setFromAddTask} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          <Task isEnabled={isEnabled} setIsEnabled={setIsEnabled} fromAddTask={fromAddTask} setFromAddTask={setFromAddTask} searchTerm={searchTerm}/>
     </div> 
    
 
   </>
  );
}

export default App;
