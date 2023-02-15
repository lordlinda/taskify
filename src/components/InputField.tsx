import React,{useRef} from 'react'
import "./styles.css";

interface Props {
    todo:string,
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd:(e:React.FormEvent)=>void
}
function InputField({todo,setTodo,handleAdd}:Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    
        <form 
        onSubmit={(e)=>{
          handleAdd(e);
          inputRef.current?.blur()
        }} 
        className="input">
            <input type="text" 
            ref={inputRef}
            value={todo}
            onChange={(e)=>setTodo(e.target.value)}
            placeholder ="Enter a task "className="input__box" />
            <button className="input_submit">Go</button>
        </form>
    
  )
}

export default InputField