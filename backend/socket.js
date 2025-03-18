import Message from './database/models/Message.js';

function initializeSocket(io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Handle incoming messages
        socket.on('message', async (messageData) => {
            try {
                // Validate message data
                if (!messageData.content) {
                    throw new Error('Message content is required');
                }

                // Save message to database
                const message = new Message({
                    content: messageData.content,
                    timestamp: messageData.timestamp || new Date()
                });
                await message.save();

                // Broadcast the message to all connected clients
                io.emit('message', {
                    _id: message._id,
                    content: message.content,
                    timestamp: message.timestamp
                });
            } catch (error) {
                console.error('Error handling message:', error);
                // sending this error to that particular user
                socket.emit('messageError', {
                    message: 'Failed to send message'
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
}

export default initializeSocket; 