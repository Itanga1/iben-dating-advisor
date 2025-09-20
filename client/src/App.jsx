import { useState } from 'react'
import './App.css'
import { LuBrain } from "react-icons/lu";
import { BiSolidSend } from "react-icons/bi";
import Axios from 'axios';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [message, setMessage] = useState('');
  const [prompt, setPrompt] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = ()=>{
    setPrompt(message);
    setLoading(true);
    setMessage('');
    Axios.post('https://iben-dating-advisor.onrender.com/generate',{
      prompt: message
    }).then((response)=>{
      setResponse(response.data.text);
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
      alert(error);
    })
  }
  return (
    <div className='AppContainer'>
      <section className='header'>
        <LuBrain style={{fontSize: 'xx-large'}}/><h1>Welcome to dating advisor</h1>
      </section>
      <div style={{display: !prompt&&'none'}} className='userPrompt'>
        <span>{prompt}</span>
      </div>
      <div style={{display: loading?'flex':'none'}} className='animateSpin'></div>
      <div style={{display: (!response || loading) && 'none'}} className='response'>
        {/* <span> */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {response}
          </ReactMarkdown>
        {/* </span> */}
      </div>
      <section className='inputContainer'>
        <input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder='Ask anything?'/>
        <BiSolidSend onClick={handleSearch} style={{fontSize: 'xx-large'}}/>
      </section>
    </div>
  )
}

export default App
