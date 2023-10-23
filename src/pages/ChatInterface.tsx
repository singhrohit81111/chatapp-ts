import React from 'react'
import UsersList from '../components/UsersList'
import Messages from '../components/Messages';
import styles from '../styles/styles.module.css';

export default function ChatInterface() {
  return (
    <div className={styles.chatInterface}>
      <UsersList/>
      <Messages/>
    </div>
  )
}
