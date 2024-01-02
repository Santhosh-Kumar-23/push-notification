import React,{useCallback,useEffect,useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import UploadScreen from './UploadScreen';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = () => {
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native Gifted Chat',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ]);
    }, []);
  
    const onSend = useCallback((newMessages = []) => {
      setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    }, []);
  
    return (
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
      />
    );
  };
  
  export default Chat
