import React from 'react'
import UsersList from './UsersList'
import Messages from './Messages';
import styles from './styles/styles.module.css';

export default function ChatInterface() {
  return (
    <div className={styles.chatInterface}>
      <UsersList/>
      <Messages/>
    </div>
  )
}
