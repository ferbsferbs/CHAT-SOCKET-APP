import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import * as Device from 'expo-device';
import io from 'socket.io-client/dist/socket.io';
var myId = Device.deviceName==null?"NULL_":Device.deviceName.replace(/[^\w\s]/gi, '_')
myId=myId+"Web"
var socket;

export function Example() {

  useEffect(() => {

    socket = io.connect('//maraton-leer.sytes.net:3003')
    socket.on('message',data=>{
      if(data.user._id!=myId)setMessages(previousMessages => GiftedChat.append(previousMessages, data))
      
    })

    socket.on('getAll',data=>{
     console.warn(data)
      
    })


  }, [])
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    setMessages([
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    socket.emit('message',messages )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: myId,
      }}
    />
  )
}