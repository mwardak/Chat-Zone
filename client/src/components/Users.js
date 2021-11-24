import React from "react";

const Users = ({ users }) => {
  const userName = users.map((user) => {
    return <p key={user.id}>{user.firstname}</p>;
  });

  return (
    <div className="col-md-3 pr-0">
      <div className="card card-bordered">
        <div className="card-header">
          <h4 className="card-title">
            <strong>Users</strong>
          </h4>
        </div>
        <div
          className="ps-container ps-theme-default ps-active-y"
          id="chat-content"
          style={{
            overflow: "scroll !important",
            height: "400px !important",
          }}
        >
          <div>
            <div className="users">{userName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
