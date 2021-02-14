import React from "react";

const Users = ({ users }) => {
  const chatUsers = users.map((user) => {
    return <p>{user.name}</p>;
  });

  return (
    <div className="container">
      <div className="user">
        USERS <br />
        {chatUsers}
      </div>
    </div>
  );
};

export default Users;
