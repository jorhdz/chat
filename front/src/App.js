import io from "socket.io-client"
import style from './App.module.css';
import {useState, useEffect} from "react"
const socket = io("http://localhost:3001")


function App() {
  const [message, setMessage]= useState("")
  const [messages, setMessages]= useState([])
  
  
useEffect(()=>{
  const reciveMessage = (message)=> {
    setMessages([...messages, message])
  }
  socket.on("send", reciveMessage)
  return ()=>{
    socket.off("send", reciveMessage)
  }
},[messages])

  let handleSubmit = evento =>{
    evento.preventDefault()
    const newMessage= {
      body: message, 
      from: "me"
    }
    setMessages([...messages , newMessage])
    setMessage("")
    socket.emit("send", newMessage.body)
  }
  return (
    <main className={style.main}>
     <form onSubmit= {handleSubmit}>
      
      <ul>
        {messages.map((message, index)=>
        (<li key={index} className={`${style.list} ${message.from ==="me"?style.me:style.you}`}> {/**Conditional styles React.  */}
          {message.from} {message.body} 
          
          </li>))}
        
      </ul>
      <input type= "text" placeholder="Writte your message." value={message} onChange={e=>setMessage(e.target.value)}/>
      <button className={style.button}>Send</button>
     </form>
    </main>
  );
}

export default App;
