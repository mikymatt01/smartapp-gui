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
            // Send the user's input to the backend API
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkMGFlMTRkMjhkMTY1NzhiMzFjOGJlNmM4ZmRlZDM0ZDVlMWExYzEiLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiRkZNIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NtYXJ0YXBwLTlmMjg3IiwiYXVkIjoic21hcnRhcHAtOWYyODciLCJhdXRoX3RpbWUiOjE3MzM1NjkzMDIsInVzZXJfaWQiOiJ4TTJrZWE4YWthT0t2WXRhMjZOTUZCeThZbkozIiwic3ViIjoieE0ya2VhOGFrYU9Ldll0YTI2Tk1GQnk4WW5KMyIsImlhdCI6MTczMzU2OTMwMiwiZXhwIjoxNzMzNTcyOTAyLCJlbWFpbCI6ImZmbUBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJmZm1AZXhhbXBsZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.CFwn3d177Ul0L6PVxc8Mx47LdEZhHeogcltNrqkpblx7dxvbuKcKT66UCB5LJilhxT6HSRjM8ZJZ-tQ8TDW28t92x1YdyhcjRdNJpXwKC3g0FdDFGhwLXaLc6pW5EoqJvnzgbId9hba1zPftK_jtqnHwE9GMoyISL5qHWzPLaEvsFlPPoAtUYtRPbk3YM7D6FcgOjDTq4QiOkaRPTyCkeE-f5BraAfwH5jafR4suKEq3ap06_OC_1tWPR8tAJBAEvqZbNM0SrugcY2dE8jmA4OVlSyqoUJDUQGkRnDfEFAfFjANbu63Plo3Ov2Dm4v9Zhv-jc57WP50qqhjpCQZG4A");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
            };
            
            //Add site from user
            const response = await fetch(`https://api-656930476914.europe-west1.run.app/api/v1.0/chat/?site_id=1&query=${userInput}`,
                requestOptions
            );

            const botMessage = (await response.text()).replaceAll('"',"");

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
                            <button onClick={handleSend} className= "chatbot-send-button">
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

