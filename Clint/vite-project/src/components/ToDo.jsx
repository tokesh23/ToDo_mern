import React from 'react'
import './Todo.css'
import { CiEdit } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const ToDo = ({text}) => {
  return (


    <div className='icon-container'>
        {text}
        <div className='Todo'></div>
       
           <div  className='icon'>
      <CiEdit />
      <RxCross1 />
      </div>
 
     
        </div>
  )
}

export default ToDo