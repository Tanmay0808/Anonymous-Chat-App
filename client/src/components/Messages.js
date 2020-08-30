import React, { useEffect, useRef } from "react";
import "../styles/messages.css";

function Messages({ allMessages, name }) {

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [allMessages]);

    const msgList = allMessages.map((data, ind) => {
        
        return (
            data.user === 'admin' ? <li className="admin-msg" key={ind}>
                {data.room ? (
                    <>Hey <strong>{data.name}</strong>{data.text} <strong>{data.room}</strong></>
                )
                :
                <><strong>{data.name}</strong> {data.text}</>}
            </li>
            :
            data.user === name ? <li className="current-users-msg" key={ind}>
                    <p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="name">You</div>
                            <div className="time">{data.time}</div>
                        </div>
                    </p>
                    <div>{data.text}</div>
            </li>
            :
            <li class="other-users-msg" key={ind}>
                <p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="name">{data.user}</div>
                        <div className="time">{data.time}</div>
                    </div>
                </p>
                <div>{data.text}</div>
            </li>
        );
    });

    return (
        <div className="card-body chat-body">
            <ul className="msg-list">
                {msgList}
            </ul>
            <div ref={messagesEndRef} />
        </div>
    );
}

export default Messages;
