import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ToDo from './components/ToDo';

const App = () => {
  const [todos, setToDos] = useState([]); // Initialize state for to-dos
  const [input, setInput] = useState(''); // State for the input field

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/get');
       console.log(response.data)
        setToDos(response.data); // Update state with fetched to-dos
      } catch (error) {
        console.error('Error fetching data:', error); // Log errors
      }
    };

    fetchData(); // Fetch data on component mount
  }, []); // Empty dependency array ensures this runs only on component mount

  const saveTodo = async () => {
    if (input.trim() === '') return; // Prevent adding empty to-dos

    try {
      await axios.post('http://localhost:8080/api/save', { toDo: input }); // Correct API endpoint for adding to-do
      setToDos([...todos, { toDo: input }]); // Update local state with the new to-do
      setInput(''); // Clear input field after adding

      console.log(response.data)
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
        {todos.map((todo, index) => (
          <ToDo key={index} text={todo.toDo} />// Render ToDo components with the text prop
        ))}
      </div>
    </div>
  );
};

export default App;
