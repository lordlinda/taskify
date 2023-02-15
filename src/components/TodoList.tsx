import React from 'react'
import { Todo } from '../model'
import SingleTodo from './SingleTodo';
import "./styles.css";
import { Droppable} from 'react-beautiful-dnd'

interface Props {
    todos:Todo[];
    completedTodos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>;

}

const TodoList:React.FC<Props>=({
    todos,
    setTodos,
    completedTodos,
    setCompletedTodos})=> {
  return (
    <div className="container">
        <Droppable droppableId='TodosList'>
            {(provided,snapshot)=>(
                <div 
                className={`todos ${snapshot.isDraggingOver ? 'dragactive':""}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
            <span className="todos__heading">
                Active Tasks
            </span>
             { 
        todos?.map((todo,i)=>
            <SingleTodo 
            index={i}
            todo={todo} 
            todos={todos} 
            key={todo.id}
            setTodos={setTodos}/>
        )
    } 
    {provided.placeholder}
        </div>
            )}
        
        </Droppable>
        <Droppable droppableId='TodosRemove'>
        {(provided,snapshot)=>(
 <div 
 className={`todos ${snapshot.isDraggingOver ? 'dragcomplete':"remove"}`}
 ref={provided.innerRef}
 {...provided.droppableProps}>
 <span className="todos__heading">
             Completed Tasks
         </span>
          { 
     completedTodos.map((todo,i)=>
         <SingleTodo 
         index={i}
         key={todo.id}
         todo={todo} 
         todos={completedTodos} 
         setTodos={setCompletedTodos}/>
     )
 } 
 {provided.placeholder}
 </div>
        )}
        </Droppable>
        </div>
  )
}

export default TodoList