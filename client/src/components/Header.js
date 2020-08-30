import React from 'react';
import "../styles/header.css";

function Header({ room }) {
    
    return (
        <>
            { room }
            <span>
                <a href="/" className="btn btn-secondary leave-room-btn">
                    Leave Room
                </a>
            </span>
        </>
    );
}

export default Header;