import { Button,Input } from 'antd'
import {TodoListProps} from '@/types/todoItem'
import TodoItem from './TodoItem'
export default function TodoList({todos,toggleTodo,deleteTodo}:TodoListProps) {
    return (
        <div>
            <ul>
                {
                    todos.map(todo=>(
                        // <li key={todo.id} className="flex justify-between items-center p-2">
                        //     <span onClick={()=>toggleTodo(todo.id)} className={todo.completed?'line-through':''}>{todo.text}</span>
                        //     <Button onClick={()=>deleteTodo(todo.id)}>删除</Button>
                        //     <Button onClick={()=>toggleTodo(todo.id)}>切换</Button>
                        // </li>
                        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} /> 
                    ))
                }
            </ul>
        </div>  
    )
}