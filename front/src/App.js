import io from "socket.io-client"
import './App.css';
import {useState} from "react"
const socket = io("http://localhost:3001")

function App() {
  const [message, setMessage]= useState("")
  const [messages, setMessages]= useState([
    {from: "jorge" , body: "hola mundo"}
  ]) 
  let handleSubmit = evento =>{
    evento.preventDefault()
    const newMessage= {
      body: message, 
      from: "me"
    }
    setMessages([newMessage , ...messages])
    setMessage("")
    socket.emit("send", newMessage.body)
  }
  return (
    <div className="App">
     <form onSubmit= {handleSubmit}>
      <input type= "text" placeholder="Writte your message." value={message} onChange={e=>setMessage(e.target.value)}/>
      <button>Send</button>
      <ul>
        {messages.map((message, index)=>(<li key={index}>{message.from} {message.body} </li>))}
        
      </ul>
     </form>
    </div>
  );
}

export default App;
