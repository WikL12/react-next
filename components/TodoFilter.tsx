import {filterTodoProps} from '@/types/todoItem';
import { Button } from 'antd';
// 导出一个默认函数，名为TodoFilter，接收一个参数filterTodo
export default function TodoFilter({filterTodo}:filterTodoProps) {
    return (
        <div>
            <Button onClick={()=>filterTodo('all')}>全部</Button>
            <Button onClick={()=>filterTodo('unCompleted')}>未完成</Button>
            <Button onClick={()=>filterTodo('completed')}>已完成</Button>
        </div>
    )

}