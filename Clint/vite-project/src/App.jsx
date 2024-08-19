import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ToDo from './components/ToDo';

const App = () => {
  const [todos, setToDos] = useState([]); // Initialize state for to-dos
  const [input, setInput] = useState(''); // State for the input field
  const [update, setUpdate] = useState(false); // State to trigger updates

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/get');
        console.log(response.data); // Log the fetched data
        setToDos(response.data); // Update state with fetched to-dos
      } catch (error) {
        console.error('Error fetching data:', error); // Log errors
      }
    };

    fetchData(); // Fetch data on component mount or when `update` changes
  }, [update]); // Dependency array includes `update` to refetch data when `update` changes

  const saveTodo = async () => {
    if (input.trim() === '') return; // Prevent adding empty to-dos

    try {
      const response = await axios.post('http://localhost:8080/api/save', { toDo: input });
      setToDos([...todos, response.data]); // Add the new to-do to the list
      setInput(''); // Clear input field after adding
      setUpdate((prevState) => !prevState); // Toggle `update` to trigger re-fetch
    } catch (error) {
      console.error('Error adding to-do:', error); // Log errors
    }
  };

  return (
    <div>
      <div className='header'>
        <h1>ToDo App</h1>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder='Add a ToDo' 
        />
        <button onClick={saveTodo}>Add</button>
      </div>

      <div className='todo-list'>
        {todos.map((todo) => (
          <ToDo key={todo._id} text={todo.toDo} id={todo._id} setUpdate={setUpdate} />
        ))}
      </div>
    </div>
  );
};

export default App;
