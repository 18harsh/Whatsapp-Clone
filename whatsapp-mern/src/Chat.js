import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import AttachmentIcon from '@material-ui/icons/Attachment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from "@material-ui/icons/Mic";

import React from 'react';
import "./Chat.css";

function Chat() {
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src=""/>
                
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
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
                <p className="chat__message">
                    <span className="chat__name">Harsh! </span>
                    this is a message
                    
                    <span className="chat__timestamp">
                    {new Date().toUTCString()}
                    </span>
                     
                </p>
                <p className="chat__message chat__reciever">
                    <span className="chat__name">Harsh! </span>
                    this is a message
                    
                    <span className="chat__timestamp">
                    {new Date().toUTCString()}
                    </span>
                     
                </p>
                <p className="chat__message">
                    <span className="chat__name">Harsh! </span>
                    this is a message
                    
                    <span className="chat__timestamp">
                    {new Date().toUTCString()}
                    </span>
                     
                </p>
                
            </div>
            <div className="chat__footer">
                
                <InsertEmoticonIcon />
                <form>
                    <input placeholder="Type a message"
                        type="text" />
                    <button type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
