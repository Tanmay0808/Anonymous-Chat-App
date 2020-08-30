const Users = [];

const addUser = ({id, name, room})=>{
    const isExisting = Users.find((user) => user.name === name && user.room === room);

    if (isExisting)
    {
        return {error:'Username Taken'};
    }
    const user = {id, name, room};
    Users.push(user);
    return { user };
}

const removeUser = (id)=>{
    const index = Users.findIndex((user) => user.id === id);

    if (index !== -1)
    {
       return Users.splice(index,1)[0];
    }
}

const getUser = (id) => Users.find((user) => user.id === id);

const getAllUsersInRoom = (room) => Users.filter((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getAllUsersInRoom};