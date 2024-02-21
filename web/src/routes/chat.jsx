import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import {socket} from "../socket"
import { Message } from '../components/message';
import { ChatWindow } from '../components/chatWindow';
import { v4 as uuidv4 } from 'uuid';
import { ChatInput } from '../components/chatInput';


export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const {room, user} = useParams();
    const navigate = useNavigate();

    const sendMessage = (message) => {
        socket.emit("message", { user: user, message: message, room: room });
    }

    const disconnectRoom = () => {
        socket.emit("leave", {user: user, room: room});
        navigate("/");
    }

    useEffect(() => {
        socket.auth = user;
        const onSysMessageEvent = (value) => setMessages(previous => [...previous, value]);
        const onRestoreHistory = (history) => setMessages(history);

        socket.on("sysmessage", onSysMessageEvent);
        socket.on("message", onSysMessageEvent);
        socket.on("restorehistory", onRestoreHistory);
        socket.emit("join", {user: user, room: room});

        return () => {
            socket.off('sysmessage', onSysMessageEvent);
            socket.off("message", onSysMessageEvent);
            socket.off("restorehistory", onRestoreHistory);
            socket.emit("leave", {user: user, room: room});
        };
    },[]);
    
    return(
        <div>
            <ChatWindow>
                { messages.map(message => <Message message={message.message} user={message.user} key={uuidv4()}/>).reverse() }
            </ChatWindow>
            <ChatInput handleMessageSend={sendMessage} handleLeave={disconnectRoom}/>
        </div>
    )

}