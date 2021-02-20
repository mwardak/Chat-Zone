import React from "react";

const Users = ({ users }) => {
  let chatUsers;
  if (users) {
    chatUsers = users.map((user) => {
      return <p>{user.name}</p>;
    });
  }

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
          <div className="media media-chat">
            <div>
              <p>Maher</p>
              <p>Adam</p>
              <p>Mike</p>
              <p>{chatUsers}</p>
              <p className="meta"></p>
            </div>
          </div>
        </div>
        <div
          className="ps-container ps-theme-default ps-active-y"
          id="chat-content"
          style={{
            overflow: "scroll !important",
            height: "400px !important",
          }}
        >
          <div className="media media-chat">
            <div className="media-body">
              <p className="meta"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
