export interface todo{
    id: number,
    text: string,
    completed: boolean
}
export interface AddTodoProps{
    addTodo:(text:string)=>void
}
export interface TodoListProps{
    todos:todo[],
    toggleTodo:(id:number)=>void, 
    deleteTodo:(id:number)=>void
}
export interface TodoItemProps{
    todo:{
        id: number,
        text: string,
        completed: boolean
    },
    toggleTodo:(id:number)=>void,
    deleteTodo:(id:number)=>void
}
export interface filterTodoProps{
    filterTodo:(type:string)=>any,
}