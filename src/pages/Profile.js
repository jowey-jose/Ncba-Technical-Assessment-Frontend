// Home Screen Page:
// Gets the current user from Local Storage and show user information & Subscriptions (with token)

import React, { useState, useEffect } from "react";
import AuthService from '../services/auth.service';
import UserService from "../services/user.service";

const Profile = () => {

    const currentUser = AuthService.getCurrentUser();

    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getServices().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>username:</strong> {currentUser.username}
          </p>

          <strong>Services List:</strong>
          <h3>{content}</h3>

          {/* <ul>
            {servicesList.services &&
                servicesList.map((service, index) => <li key={index}>{service}</li>)}
          </ul> */}

        </div>
      );
};

export default Profile