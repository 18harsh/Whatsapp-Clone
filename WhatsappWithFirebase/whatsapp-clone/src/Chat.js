import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import AttachmentIcon from '@material-ui/icons/Attachment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from "@material-ui/icons/Mic";
// import axios from "./axios";
import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";


function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => (
                    setRoomName(snapshot.data().name)
            ))
            
            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc =>doc.data()))
            ))
        }
        setSeed(Math.floor(Math.random() * 5000));
    },[roomId])

    
    
    
    const sendMessage = async (e) => {
        e.preventDefault();
        // await axios.post('/messages/new', {
        //     "message": input,
        //     "name": "Harsh Gandhi",
        //     "timestamp": "Demo timestamp...",
        //     "received": false,
        // })

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("")
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                        {messages.length!=0? new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString():"is not available"}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachmentIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${message.name==user.displayName && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    
                    <span className="chat__timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                     
                </p>
                ))}
                
            </div>
            <div className="chat__footer">
                
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a message"
                        type="text" />
                    <button onClick={ sendMessage } type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
