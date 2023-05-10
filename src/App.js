import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";


// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCqL3qG_VlHI8RuBMX0n-z3MCxwOTleUgM",
  authDomain: "codebox-md.firebaseapp.com",
  projectId: "codebox-md",
  storageBucket: "codebox-md.appspot.com",
  messagingSenderId: "138834196903",
  appId: "1:138834196903:web:80bd889a02012dbc29de82",
});

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMessageSend(event);
    }
  };
  

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up subscription
    return unsubscribe;
  }, []);

  function handleMessageSend() {
    const updatedMessages = [
      ...messages,
      { sender: user.displayName || "You", message: newMessage, Date: Date() },
    ];

    setMessages(updatedMessages);
    setNewMessage("");
  }

  function PermanentMessages() {
    return (
      <div>
        <h2 className="font-bold">CodeBox</h2>
        <p>Welcome to the CodeBox app!</p>
        <p>Here are some tips:</p>
        <ul>
          <li className="text-black">
            Click the Send button to send a message
          </li>
        </ul>
      </div>
    );

    
  }

  function handleClear() {
    setNewMessage("");
  }

  function handleCopyMessage(message) {
    navigator.clipboard.writeText(message);
  }

  function handleSignOut() {
    firebase.auth().signOut();
    setMessages([]);
  }

  return (
    <div className="flex flex-col h-screen ">
      <div className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
        <div className="font-bold text-xl flex flex-row items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-emerald-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl text-white">CodeBox</span>
        </div>
        {user ? (
          <div className="flex flex-row items-center">
            <div className="mr-3">{user.displayName}</div>
            <div className="mr-3 text-emerald-300">{user.email}</div>
            <button
              className="bg-emerald-500 text-white rounded-lg px-2 py-1"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <a
            href="#Login"
            className="bg-emerald-500 text-white rounded-lg px-2 py-1"
          >
            Sign In
          </a>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 mx-[30vh]">
        <div className="flex flex-col bg-gray-200 rounded-lg p-4 mb-4">
          {" "}
          <PermanentMessages />
        </div>
        <code>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`bg-${
                message.sender === "You" ? "blue" : "gray"
              }-200 rounded-lg p-4 mb-4`}
            >
              <div className="flex items-center mb-2">
                <div className="font-bold mr-5">{message.sender}</div>
                <div className="bg-gray-300 hover:bg-gray-400 rounded-lg px-2 py-1 text-s flex-row mr-5">
                  {" "}
                  {message.Date}
                </div>
                <div>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 rounded-lg px-2 py-1 text-s flex-row"
                    onClick={() => handleCopyMessage(message.message)}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="text-gray-800"> <pre>{message.message}</pre></div>
            </div>
          ))}
        </code>
      </div>

      <div className="flex p-4 bg-gray-700 text-white">
        <textarea
          type="text"
          className="flex-1 rounded-lg p-2 mr-4 bg-gray-800 ml-[33vh] "
          placeholder="Type your message here..."
          value= {newMessage}
          contentEditable={true}
          onChange={(event) => setNewMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="mr-[32vh] h-4">
          <button
            className="bg-red-500 text-white text-xl py-4 px-6 rounded-md mr-2 hover:bg-red-800"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="bg-emerald-500 text-white text-xl rounded-lg py-4 px-4 hover:bg-emerald-700"
            onClick={handleMessageSend}
            disabled={!newMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
