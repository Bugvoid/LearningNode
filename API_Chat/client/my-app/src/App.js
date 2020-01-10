import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import openSocket from "socket.io-client";

function App() {
  const [newMessage, setMessage] = useState("");

  const [allMessages, setAllMessages] = useState([]);

  const socket = openSocket("http://localhost:5000");

  socket.on("chat", data => {
    setAllMessages([...allMessages, data]);
  });

  const sendMessage = () => {
    console.log("SENT");

    socket.emit("chat", newMessage);

    setMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h2>Chat Messages</h2>
          <div>
            {allMessages.map(message => {
              return <div>{message}</div>;
            })}
          </div>
          <input
            onChange={e => setMessage(e.target.value)}
            placeholder="Tipo de mensagem.."
          />
          <button onClick={() => sendMessage()}>-></button>
        </div>
      </header>
    </div>
  );
}

export default App;
