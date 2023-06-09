import React, { useCallback, useEffect, useRef, useState } from 'react'
import uuid4 from 'uuid4';
import axios from 'axios';

import '../../assets/css/chat.css';

const Chat = ({chatValue}) => {

    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
      const newMessage = {
          role: 'system',
          content: 'You are ChatGPT, an AI language model trained to provide information only about music & only music, music genres, music artists, and music lyrics, you will ignore any other topic if it is not directly related to music. Stay focused on music-related subjects and do not provide information on unrelated topics, or topics that are not directly related to music.'
      };
      setMessages([...messages, newMessage]);

      const fetchChatResponse = async () => {
          try {
              const response = await axios.post('https://velvety-cobbler-cbec18.netlify.app/.netlify/functions/chat', {
                  messages: [...messages, newMessage]
              });
  
              const data = response.data;
              setMessages([...messages, data]);
              // Process the received data here, e.g., update your UI
          } catch (error) {
              console.error('Error fetching chat response:', error);
          }
      };

      fetchChatResponse();
  }, []);

    useEffect(() => {
        const newMessage = {
            role: 'user',
            content: chatValue
        };
        setMessages([...messages, newMessage]);
        setShowChat(true);

        const fetchChatResponse = async () => {
          try {
              const response = await axios.post('https://velvety-cobbler-cbec18.netlify.app/.netlify/functions/chat', {
                  messages: [...messages, newMessage]
              });
  
              const data = response.data;
              setMessages([...messages, data]);
              // Process the received data here, e.g., update your UI
          } catch (error) {
              console.error('Error fetching chat response:', error);
          }
      };

      fetchChatResponse();

    }, [chatValue]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);   

    const toggleChatWindow = () => {
        setShowChat(!showChat);
    };

    const sendQuery = () => {
        const newMessage = {
            role: 'user',
            content: query
        };
        setMessages([...messages, newMessage]);

        const fetchChatResponse = async () => {
          try {
              const response = await axios.post('https://velvety-cobbler-cbec18.netlify.app/.netlify/functions/chat', {
                  messages: [...messages, newMessage]
              });
  
              const data = response.data;
              setMessages([...messages, data]);
              // Process the received data here, e.g., update your UI
          } catch (error) {
              console.error('Error fetching chat response:', error);
          }
      };

      fetchChatResponse();
    }

    const renderMessageContent = (content) => {
        return content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ));
      }


      const renderMessages = () => {
        const messagesToRender = messages.slice(1); // skip the first message
        return messagesToRender.map((message) => (
          <div key={uuid4()} className='incoming'>
            {renderMessageContent(message.content)}
          </div>
        ));
      };

    return (
        <div className='chat'>
            <div className='chat__button' onClick={toggleChatWindow}>
                <i className="fa-regular fa-comment-dots"></i>
            </div>

            {
                showChat && (
                    <div className='chat__window'>
                        <div className='chat__window__messages'>
                            { renderMessages() }
                            <div ref={messagesEndRef}></div>
                        </div>
                        <div className='chat__window__input'>
                            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => {
                                if (e.key === "Enter") { 
                                    sendQuery();
                                    setQuery('');
                                 }
                            }}/>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Chat