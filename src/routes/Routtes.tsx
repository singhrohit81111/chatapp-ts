import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatRoom from '../components/ChatRoom'
import UsersList from '../components/UsersList'
import Messages from '../components/Messages'
import ChatInterface from '../components/ChatInterface'

export default function Routtes() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<ChatRoom/>}/>
                       
                        <Route path="messages" element={<ChatInterface/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
