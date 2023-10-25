import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatRoom from '../pages/ChatRoom'
import ChatInterface from '../pages/ChatInterface'

export default function Routtes() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<ChatRoom/>}/>
                        <Route path="chatroom" element={<ChatRoom/>}/>
                        <Route path="messages" element={<ChatInterface/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
