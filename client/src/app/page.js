"use client";
import Image from "next/image";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:9000");

    socketRef.current.on("connect", () => {
      console.log("Connected with id:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socketRef.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // receive message from server
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socketRef.current.emit("message", message); // send message to server
      setMessage("");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Chat App</h1>
      
      <div className="mb-4 h-[400px] overflow-y-auto border rounded p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
