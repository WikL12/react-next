import {useState} from 'react';
import {AddTodoProps} from '@/types/todoItem';
import { Input ,Button} from 'antd';
export default function AddTodo({addTodo}:AddTodoProps){
    const [text,setText] = useState('');
    const handleSubmit = (e:React.FormEvent<HTMLFormElement|EventTarget>)=>{
        e.preventDefault();
        console.log(text);
        if(text.trim().length===0){
            return;
        }else{
            addTodo(text);
        }
        setText('');
    }
    return (
       <form >
        <Input type="text" value={text} onChange={e=>setText(e.target.value)}/>
        <Button onClick={handleSubmit}>新建事项</Button>
       </form>
    )
}