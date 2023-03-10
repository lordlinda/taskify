import React,{useState,useEffect,useRef} from 'react'
import { Todo } from '../model'
import { MdDone } from "react-icons/md";
import { MdEdit,MdDelete } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd'
import "./styles.css";

interface Props {
    todo:Todo;
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    index:number
}


const SingleTodo:React.FC<Props>=({todo,todos,setTodos,index})=> {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
  inputRef.current?.focus()
  },[edit])
  
  const handleDone =(id:number)=>{
   setTodos(
      todos.map(todo=>
      todo.id === id ? {...todo,isDone:!todo.isDone}:todo
      ))
      
  }
  const handleDelete=(id:number)=>{
    setTodos(todos.filter(todo=> todo.id !==id))

  }

  const handleEdit=(e:React.FormEvent,id:number)=>{
    e.preventDefault();
    setTodos(
      todos.map(todo=>
        todo.id === id ? {...todo,todo:editTodo}:todo
        )
    )
    setEdit(false)

  }
  return (
    <Draggable 
    draggableId={todo.id.toString()} 
    index={index}>
      {(provided,snapshot)=>(
        <form
        onSubmit={(e)=> handleEdit(e,todo.id)} 
        className={`todos__single ${snapshot.isDragging ? 'drag':""}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
      {
        edit ?
        <input 
        ref={inputRef}
        className='todos__single--text'
        type="text"  
        value={editTodo} 
        onChange={(e)=>setEditTodo(e.target.value)}/>
        :todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ):(
          <span className="todos__single--text">{todo.todo}</span>
        )
      }
     
     <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <MdEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <MdDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
    </form>
      )}
    
    </Draggable>
  )
}

export default SingleTodo