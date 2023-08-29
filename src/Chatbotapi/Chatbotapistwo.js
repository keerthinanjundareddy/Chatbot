import React, { useState, useRef, useEffect } from 'react';
import './Chatbotpistwo.css';
import persontwo from '../Assets/person.png'

function Chatbotapistwo() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messageListRef = useRef(null);
  const [inputFocused, setInputFocused] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const clearChat = () => {
    setMessages([]); // Set messages to an empty array to clear the chat
  };

  const sendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessage = {
      text: userInput,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setUserInput('');
  };

  useEffect(() => {
    // Scroll to the bottom of the message list container when messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
     <div className={`navbar ${inputFocused ? 'navbar-focused' : ''}`}>
  {/* <div className='nav-parent-div'> */}

         <div className='chat-parent-div'>
              <div className='chat-name-div'>Chat</div>
                <div>Readme</div>
         </div>

        <div className='clear-chat-parent-div'>
        
                <div className='new-chat-div'  onClick={clearChat}>+ New Chat</div>
                <div style={{width:"20px",height:"20px"}} >
                  <img src={persontwo} alt="person-icon" style={{width:"100%",height:"100%",objectFit:"contain"}} />
                </div>
          
        </div>
   {/* </div> */}
      </div>

      <div className="chat-app">
      <div className="chat">
        {/* Render chat messages */}
        <div className="message-list" ref={messageListRef}>
          {messages.map((message, index) => (
            <div key={index} className="message" >
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              <div className='user-parent-div'>
                <div className='user-timestamp-parent-div'>
                <div className='user-name-div'>user</div>
                <div className='user-time-div'>{message.timestamp}</div>
                </div>
              <div className='user-question-div'>{message.text}</div>
              </div>
              <div className='user-parent-output-div'>
                <div className='user-timestamp-parent-div-two'>
              <div className="chatbot-name-div">Chatbot</div>
              <div className='chatbot-time-div'>{message.timestamp}</div>
              </div>
              <div className='chatbot-output-div'>output</div>
              </div>
              </div>
            </div>
          ))}
        </div>
          <div className="user-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleInputChange}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbotapistwo;
