import React from "react";
import "../styles/users.css";

function UsersOnline({ users }) {

    return (
        <div className="side-content">
            <h5 className="text-center mt-3">Users Online</h5>
            <ul className="user-list">
            {users && users.map((user, ind) => {
                return <li key={ind}>{user.name}</li>;
            })}
            </ul>
        </div>
  );
}

export default UsersOnline;
