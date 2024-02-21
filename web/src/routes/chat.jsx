import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import {socket} from "../socket"
import { Message } from '../components/message';
import { ChatWindow } from '../components/chatWindow';
import { v4 as uuidv4 } from 'uuid';
import { ChatInput } from '../components/chatInput';

/**
 * Render chat page.
 * @returns {React.JSX.Element}
 */
export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const {room, user} = useParams();
    const [respondUser, setRespondUser] = useState("");
    const navigate = useNavigate();

    /**
     * Socket emits message for room members.
     * @param {string} message 
     */
    const sendMessage = (message) => {
        socket.emit("message", { user: user, message: message, room: room });
    }

    /**
     * Leave the chat room.
     */
    const disconnectRoom = () => {
        socket.emit("leave", {user: user, room: room});
        navigate("/");
    }

    useEffect(() => {
        // Set auth property to user name.
        socket.auth = user;

        // Socket event callbacks
        const onSysMessageEvent = (value) => setMessages(previous => [...previous, value]);
        const onRestoreHistory = (history) => setMessages(history);

        // Hook to events
        socket.on("sysmessage", onSysMessageEvent);
        socket.on("message", onSysMessageEvent);
        socket.on("restorehistory", onRestoreHistory);
        socket.emit("join", {user: user, room: room});

        // Component unmount cleanup
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
                { messages.map(message => ( 
                    <Message 
                        highlight={message.message.includes(user)} 
                        handleUsernameCopy={(username) => setRespondUser(username)} 
                        message={message.message} user={message.user} key={uuidv4()}
                    />)).reverse() 
                }
            </ChatWindow>
            <ChatInput handleMessageSend={sendMessage} handleLeave={disconnectRoom} respondUser={respondUser} resetRespondUser={() => setRespondUser("")}/>
        </div>
    )
}