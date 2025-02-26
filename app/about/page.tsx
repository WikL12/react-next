"use client"
import '@ant-design/v5-patch-for-react-19';

import { Button ,message} from 'antd';
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";
import TodoItem from '@/components/TodoItem';
import TodoFilter from '@/components/TodoFilter';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';
import "../globals.css";
import {todo} from '@/types/todoItem';
export default function About() {
  const [todos,setTodos] = useState<todo[]>([]);
  const addTodo = (text:string)=>{
    const newTodo = {
      id:Date.now(),
      text:text,
      completed:false
    }
    setTodos([...todos,newTodo])
  }
  const deleteTodo = (id:number)=>{
    setTodos(todos.filter(todo=>todo.id!==id))
  }
  const toggleTodo = (id:number)=>{
    setTodos(todos.map(todo=>{
      if(todo.id===id){
          return {...todo, completed:!todo.completed}
      }
      return todo;
  }))
}
const filterTodo = (type:string)=>{
  switch(type){
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(todo=>todo.completed);
    case 'uncompleted':
      return todos.filter(todo=>!todo.completed);
    default:
      return todos;
  }
}
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>todo List</h1>
      <AddTodo addTodo={addTodo}/>
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
      <TodoFilter filterTodo={filterTodo}/>
    </div>
  );  
}



