import React, { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription
} from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  useQuery(messagesQuery, {
    onCompleted: ({ messages }) => {
      setMessages(messages);
    }
  });
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ subscriptionData }) => {
      setMessages(messages.concat(subscriptionData.data.messageAdded));
    }
  });
  const [addMessage] = useMutation(addMessageMutation);

  const handleSend = (text) => {
    addMessage({ variables: { input: { text } } });
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
};

export default Chat;
