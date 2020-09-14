import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "../styles/chat.css";

import Header from "../components/Header";
import UsersOnline from "../components/UsersOnline";
import Messages from "../components/Messages";
import InputBox from "../components/InputBox";

let socket = io();

function ChatRoom({ location }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [newMessage, setMessageToSend] = useState('');
    const [allMessages, setMessagesInRoom] = useState([]);

    //componentDidUpdate Equivalent
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        setName(name);
        setRoom(room);

        //Join Event
        socket.emit("joinRoom", { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });

    }, [location.search]);

    //ComponentDidMount Equivalent
    useEffect(() => {
        socket.on("message", (message) => {
            setMessagesInRoom((allMessages) => [...allMessages, message]);
        });

        socket.on('roomUsers', ({ users }) => {
            setUsers(users);
        });

    }, []);

    const sendMessage = (e) => {
        e.preventDefault();

        if (newMessage) {
            socket.emit("sendMessage", { message: newMessage }, () => setMessageToSend(''));
        }
    };

    return (
        <div className="container chat-container">
            <div className="row justify-content-center">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 chat-header" style={{ height: 80 }} >
                    <Header room={room} />
                </div>
            </div>
            <div className="row row-two">
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 users-box">
                    <UsersOnline users={users} />
                </div>

                <div className="card col-lg-9 col-md-9 col-sm-9 col-xs-9 chat-box">
                    <Messages allMessages={allMessages} name={name} />
                    <InputBox newMessage={newMessage} setMessageToSend={setMessageToSend} sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
