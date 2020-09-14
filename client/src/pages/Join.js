import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/join.css';
import ImageLogo from '../logo.svg';

function JoinChat() {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="container" id="container">
            <div className="row justify-content-center row-one">
                
                <div className="left col-lg-5 col-md-4 col-sm-4 col-xs-4 text-center text-white">
                    <img className="chat-logo" src={ImageLogo} alt="." />
                    <h1>Chat in real time without revealing your identity</h1>
                </div>

                <div id="join" className="right col-lg-5 col-md-6 col-sm-6 col-xs-6">
                    <div className="card-box">
                        <div className="card-box-body">
                            <h3 className="text-center mb-5">JOIN NOW</h3>
                            
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="Room Name" onChange={(e) => setRoom(e.target.value)} />
                            </div>
                            
                            <div className="form-group">
                                <Link onClick={(e) => (!name || !room) ? e.preventDefault() : null} to={`/chat/?name=${name}&room=${room}`}>
                                    <button className="btn btn-primary text-center">Enter Room</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default JoinChat;
