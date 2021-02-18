import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Users = ({ users }) => {
  const chatUsers = users.map((user) => {
    return <p>{user.name}</p>;
  });

  return (
    <div className="col-md-3 pr-0">
      <div className="card card-bordered">
        <div className="card-header">
          <h4 className="card-title">
            <strong>Users</strong>
          </h4>
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
                <p>{chatUsers}</p>

                <p className="meta"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
