import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const onhandleText = (e) => {
        setText(e.target.value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(""); // Reset result
        try {
            const payload = {
                model: "gemma:2b",
                prompt: text,
                stream: false,
            };
            const response = await axios.post("http://localhost:11434/api/generate", payload);
            if (response.status === 200) {
                // Format xuống dòng bằng cách thay thế dấu `\n` thành thẻ `<br>`
                setResult(response.data.response.replace(/\n/g, "<br>"));
            }
        } catch (error) {
            console.error(error);
            setResult("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <form className="chatbot-form" onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    value={text}
                    onChange={onhandleText}
                    className="chatbot-input"
                    placeholder="Bạn có thắc mắc gì không?"
                />
                <button type="submit" className="chatbot-button" disabled={loading || !text.trim()}>
                    {loading ? "Đang phân tích" : "Gửi câu hỏi"}
                </button>
            </form>
            <div className="chatbot-response">
                {loading && <p className="loading-text">Chờ tí, hệ thống đang phân tích để đưa ra câu trả lời</p>}
                {!loading && result && (
                    <p
                        className="response-text"
                        dangerouslySetInnerHTML={{ __html: result }}
                    ></p>
                )}
            </div>
        </div>
    );
};

export default Chatbot;
