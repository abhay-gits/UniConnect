import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Connect to the WebSocket server
        const newSocket = io('https://uniconnect-kzn1.onrender.com', {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        newSocket.on('connect', () => {
            setError(null);
            setSocket(newSocket);
        });

        newSocket.on('connect_error', (err) => {
            setError('Failed to connect to chat server');
            console.error('Socket connection error:', err);
        });

        // Listen for incoming messages
        newSocket.on('message', (message) => {
            setMessages(prev => [...prev, message]);
        });

        newSocket.on('messageError', (error) => {
            setError(error.message);
            setTimeout(() => setError(null), 3000);
        });

        // Load previous messages
        const fetchMessages = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://uniconnect-kzn1.onrender.com/api/messages');
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                setError('Failed to load messages');
                console.error('Error fetching messages:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();

        // Cleanup on unmount
        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && socket) {
            const messageData = {
                content: newMessage.trim(),
                timestamp: new Date().toISOString(),
            };

            // Emit the message to the server
            socket.emit('message', messageData);
            setNewMessage('');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md">
                    {/* Chat Header */}
                    <div className="border-b p-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Live Chat</h2>
                        <p className="text-sm text-gray-500">Connect with other users in real-time</p>
                        {error && (
                            <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Messages Container */}
                    <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                No messages yet. Be the first to send one!
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div
                                    key={message._id || index}
                                    className="flex flex-col"
                                >
                                    <div className="max-w-[70%] rounded-lg p-3 bg-gray-100">
                                        <p className="break-words">{message.content}</p>
                                        <p className="text-xs mt-1 text-gray-500">
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4">
                        <form onSubmit={sendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                disabled={!socket}
                            />
                            <button
                                type="submit"
                                className={`px-6 py-2 rounded-md transition-colors duration-200 ${socket
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                                disabled={!socket}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M11.5 12.5L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat; 