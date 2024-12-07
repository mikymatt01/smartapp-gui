import React, { useState } from "react";
import axios from "axios";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SendIcon from "@mui/icons-material/Send";
import "./Chatbot.css";

export function Chatbot () {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { sender: "user", text: userInput }];
        setMessages(newMessages);

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: userInput }],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API Key
                    },
                }
            );
            const botMessage = response.data.choices[0].message.content;

            setMessages([...newMessages, { sender: "bot", text: botMessage }]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages([
                ...newMessages,
                { sender: "bot", text: "Sorry, something went wrong. Please try again later!" },
            ]);
        }

        setUserInput("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Chat icon */}
            <button className="chat-icon" onClick={toggleChatbot}>
                <QuestionAnswerIcon />
            </button>

            {/* Chatbot */}
            {isOpen && (
                <div className="chatbot-container">
                    {/* Top bar */}
                    <div className="chatbot-header">
                        <span>Chat</span>
                        <button className="close-button" onClick={toggleChatbot}>
                            ✖
                        </button>
                    </div>

                    <div className="chatbot-box">
                        <div className="chatbot-messages">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={
                                        msg.sender === "user"
                                            ? "chat-message user-message"
                                            : "chat-message bot-message"
                                    }
                                >
                                    <p>{msg.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="chatbot-input-container">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="chatbot-input"
                                placeholder="Write a message..."
                            />
                            <button onClick={handleSend}>
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;

