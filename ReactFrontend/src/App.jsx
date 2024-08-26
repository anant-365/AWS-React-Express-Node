import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChatClient } from './chat-client';

const URL = 'wss://8kq8sl5g96.execute-api.ap-south-1.amazonaws.com/production/';

const App = () => {

  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState([]);
  const [chatRows, setChatRows] = useState([]);

  const onSocketOpen = useCallback(() => {
    console.log('WebSocket connection opened');
    setIsConnected(true);
    const name = prompt('Enter your name');
    socket.current?.send(JSON.stringify({ action: 'setName', name }));
  }, []);

  const onSocketClose = useCallback(() => {
    console.log('WebSocket connection closed');
    setMembers([]);
    setIsConnected(false);
    setChatRows([]);
  }, []);

  const onSocketMessage = useCallback((dataStr) => {
    console.log('WebSocket message received:', dataStr);
    const data = JSON.parse(dataStr);
    if (data.members) {
      setMembers(data.members);
    } else if (data.publicMessage) {
      setChatRows(oldArray => [...oldArray, <span><b>{data.publicMessage}</b></span>]);
    } else if (data.privateMessage) {
      alert(data.privateMessage);
    } else if (data.systemMessage) {
      setChatRows(oldArray => [...oldArray, <span><i>{data.systemMessage}</i></span>]);
    }
  }, []);

  const onConnect = useCallback(() => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      console.log('Connecting to WebSocket...');
      socket.current = new WebSocket(URL);
      socket.current.addEventListener('open', onSocketOpen);
      socket.current.addEventListener('close', onSocketClose);
      socket.current.addEventListener('message', (event) => {
        onSocketMessage(event.data);
      });
    }
  }, [onSocketOpen, onSocketClose, onSocketMessage]);

  useEffect(() => {
    return () => {
      console.log('Cleaning up WebSocket connection');
      socket.current?.close();
    };
  }, []);

  const onSendPrivateMessage = useCallback((to) => {
    const message = prompt('Enter private message for ' + to);
    socket.current?.send(JSON.stringify({
      action: 'sendPrivate',
      message,
      to,
    }));
  }, []);

  const onSendPublicMessage = useCallback(() => {
    const message = prompt('Enter public message');
    socket.current?.send(JSON.stringify({
      action: 'sendPublic',
      message,
    }));
  }, []);

  const onDisconnect = useCallback(() => {
    if (isConnected) {
      console.log('Disconnecting from WebSocket...');
      socket.current?.close();
    }
  }, [isConnected]);

  return <ChatClient
    isConnected={isConnected}
    members={members}
    chatRows={chatRows}
    onPublicMessage={onSendPublicMessage}
    onPrivateMessage={onSendPrivateMessage}
    onConnect={onConnect}
    onDisconnect={onDisconnect}
  />;
}

export default App;
