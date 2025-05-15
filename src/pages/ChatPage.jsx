import React, { useState } from 'react';
import styles from './ChatPage.module.css';
import { FaUserCircle, FaPaperPlane } from 'react-icons/fa';

const conversationsStub = [
  {
    id: 'c1',
    name: 'Alex Smith',
    lastMessage: 'Thanks, see you then!',
    unread: true,
    messages: [
      { from: 'provider', text: 'Hi Alex, your booking is confirmed for May 25th at 10:00.', time: '09:00' },
      { from: 'customer', text: 'Thanks, see you then!', time: '09:01' },
    ],
  },
  {
    id: 'c2',
    name: 'Taylor Brown',
    lastMessage: 'Can you come earlier?',
    unread: false,
    messages: [
      { from: 'customer', text: 'Can you come earlier?', time: '08:30' },
      { from: 'provider', text: 'I will check my schedule.', time: '08:32' },
    ],
  },
];

const ChatPage = () => {
  const [conversations, setConversations] = useState(conversationsStub);
  const [selectedId, setSelectedId] = useState(conversationsStub[0].id);
  const [message, setMessage] = useState('');

  const selectedConv = conversations.find(c => c.id === selectedId);

  const handleSend = () => {
    if (!message.trim()) return;
    setConversations(conversations.map(conv =>
      conv.id === selectedId
        ? { ...conv, messages: [...conv.messages, { from: 'provider', text: message, time: 'Now' }], lastMessage: message }
        : conv
    ));
    setMessage('');
  };

  return (
    <div className={styles.chatPage}>
      <aside className={styles.sidebar}>
        <h2>Messages</h2>
        <ul className={styles.conversationList}>
          {conversations.map(conv => (
            <li
              key={conv.id}
              className={selectedId === conv.id ? styles.selected : ''}
              onClick={() => setSelectedId(conv.id)}
            >
              <FaUserCircle size={32} className={styles.avatar} />
              <div className={styles.convInfo}>
                <div className={styles.convName}>{conv.name}</div>
                <div className={styles.convLast}>{conv.lastMessage}</div>
              </div>
              {conv.unread && <span className={styles.unreadDot}></span>}
            </li>
          ))}
        </ul>
      </aside>
      <main className={styles.chatWindow}>
        <header className={styles.chatHeader}>
          <FaUserCircle size={36} className={styles.avatar} />
          <span className={styles.chatName}>{selectedConv.name}</span>
        </header>
        <div className={styles.messages}>
          {selectedConv.messages.map((msg, idx) => (
            <div
              key={idx}
              className={msg.from === 'provider' ? styles.messageProvider : styles.messageCustomer}
            >
              <div className={styles.msgText}>{msg.text}</div>
              <div className={styles.msgTime}>{msg.time}</div>
            </div>
          ))}
        </div>
        <div className={styles.inputBar}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}><FaPaperPlane /></button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage; 