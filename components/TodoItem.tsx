import {TodoItemProps} from '@/types/todoItem'
import { Button,Input } from 'antd'
export default function TodoItem({todo,toggleTodo,deleteTodo}:TodoItemProps){
    return(
        <li>
            <span onClick={()=>toggleTodo(todo.id)} className={todo.completed?'line-through':''}>{todo.text}</span>
            <Button onClick={()=>deleteTodo(todo.id)}>删除</Button>
            <Button onClick={()=>toggleTodo(todo.id)}>切换</Button>
        </li>
    )
}