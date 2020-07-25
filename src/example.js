import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import io from 'socket.io-client/dist/socket.io';
var socket;
export function Example() {

  useEffect(() => {

    socket = io.connect('http://localhost:80', {
      transports: ['websocket']
    });
    onConnectSocket()

  }, [])
  const [messages, setMessages] = useState([]);

 const  onConnectSocket = () => {
    //Vérification si socket n'est pas à null
    if(socket) {
      //Ecoute de l'évènement
      socket.on('connect', () => {
        socket.emit('i-am-connected'); // Emission d'un message

        //Modification du status de connexion
        
      });
    }
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }, {
        _id: 3,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 4,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}