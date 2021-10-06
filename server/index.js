const express     = require('express');
const app         = express();
const http        = require('http').createServer(app);
const socket      = require('socket.io');
const io          = socket(http);
const cors        = require('cors');
const path        = require('path');
const { addUser, removeUser, getUser, getAllUsersInRoom }  = require('./Users');

app.use(cors());

//Handle New Connection
io.on('connection', (socket) => {
    //Handle Join Room
    socket.on('joinRoom',({name, room}, callback)=>{
        const {error, user} = addUser({ id : socket.id, name, room });

        if (error)
        {
            socket.emit('message', {user:'admin', name : name,room : room, text:`, another person with same name is already there in room, so we can't let you in, try changing your name and rejoin the room `});
            return callback(error);
        }

        //Join User In Room
        socket.join(user.room);

        //Admin Mesaages
        socket.emit('message', {user:'admin', name:user.name, room : user.room, text:`, welcome to the room `});
        socket.broadcast.to(user.room).emit('message', {user:'admin', name : user.name, text:` joined the chat`});

        //Updating Users In Room
        io.to(user.room).emit('roomUsers', {room: user.room, users: getAllUsersInRoom(user.room)});

        callback();

    });

    //Handle New Message Requests
    socket.on('sendMessage',({ message }, callback )=>{
        const user = getUser(socket.id);
        const time = new Date().toLocaleTimeString('en-US', {timeZone: "Asia/Kolkata", hour: 'numeric', hour12: true, minute: 'numeric',second: 'numeric'});

        if (user){
            io.to(user.room).emit('message',{ user : user.name, text : message, time:time});
        }

        callback();
    });
    
    //Handle Disconnect
    socket.on('disconnect',()=>{
    
        const user = removeUser(socket.id);
        
        if (user)
        {
            io.to(user.room).emit('message',{ user : 'admin', name:user.name ,text : ` left the chat`});
            io.to(user.room).emit('roomUsers', {room: user.room, users: getAllUsersInRoom(user.room)});
        }
    });

});

const port = process.env.PORT || 5000;

http.listen(port,()=>{
    console.log('Server Running At Port : ',port);
});