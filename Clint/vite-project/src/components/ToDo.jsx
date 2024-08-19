import React from 'react';
import axios from 'axios'; // Import axios
import './Todo.css';
import { CiEdit } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';

const ToDo = ({ text, id, setUpdate }) => {
  const deleteTodo = async () => {
    try {
      // Use backticks for template literals
      await axios.delete(`http://localhost:8080/api/delete/${id}`);
      console.log('To-do deleted successfully');
      setUpdate((prevState) => !prevState); // Trigger update in the parent component
    } catch (error) {
      console.error('Error deleting to-do:', error); // Log any errors
    }
  };

  return (
    <div className='icon-container'>
      {text}
      <div className='Todo'></div>
      <div className='icon'>
        <CiEdit />
        <RxCross1 onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default ToDo;
