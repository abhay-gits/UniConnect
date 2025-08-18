import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
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
            setIsConnected(true);
        });

        newSocket.on('connect_error', (err) => {
            setError('Failed to connect to chat server');
            console.error('Socket connection error:', err);
            setIsConnected(false);
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
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
        if (newMessage.trim() && socket && isConnected) {
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
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Chat Header */}
                    <div className="border-b p-4 bg-gradient-to-r from-green-50 to-blue-50 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">Live Chat</h2>
                            <p className="text-sm text-gray-500">Connect with other users in real-time</p>
                        </div>
                        <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-sm ${isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            <span className={`h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </div>
                    </div>

                    {error && (
                        <div className="px-4 pt-3">
                            <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-100">
                                {error}
                            </div>
                        </div>
                    )}

                    {/* Messages Container */}
                    <div className="h-[60vh] overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">
                                No messages yet. Be the first to send one!
                            </div>
                        ) : (
                            messages.map((message, index) => {
                                const currentDateLabel = new Date(message.timestamp).toDateString();
                                const isNewDay = index === 0 || new Date(messages[index - 1].timestamp).toDateString() !== currentDateLabel;
                                return (
                                    <div key={message._id || index} className="flex flex-col gap-2">
                                        {isNewDay && (
                                            <div className="flex items-center gap-3 py-2">
                                                <div className="flex-1 h-px bg-gray-200" />
                                                <span className="text-xs text-gray-500 whitespace-nowrap">{currentDateLabel}</span>
                                                <div className="flex-1 h-px bg-gray-200" />
                                            </div>
                                        )}
                                        <div className="flex">
                                            <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-white shadow-sm border border-gray-100">
                                                <p className="text-gray-800 whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                                                <p className="text-[10px] mt-2 text-gray-400 tracking-wide">
                                                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4 bg-white">
                        <form onSubmit={sendMessage} className="flex items-center gap-2">
                            <div className="flex-1 flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            sendMessage(e);
                                        }
                                    }}
                                    placeholder={isConnected ? 'Type your message…' : 'Connecting to chat…'}
                                    aria-label="Message input"
                                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
                                    disabled={!socket || !isConnected}
                                />
                            </div>
                            <button
                                type="submit"
                                className={`inline-flex items-center justify-center h-10 w-10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                                    newMessage.trim() && isConnected ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                                disabled={!newMessage.trim() || !isConnected}
                                title="Send"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none">
                                    <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M11.5 12.5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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