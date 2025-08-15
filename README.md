# UniConnect

UniConnect is a real-time communication platform designed for university students to connect, share information, and engage with their peers. The platform features a live chat system, notice board, and confession sharing capabilities.

## Features

- **Live Chat**
  - Real-time messaging
  - Persistent message history
  - Auto-scrolling to latest messages
  - Connection status indicators
  - Error handling and reconnection

- **Notice Board**
  - Post important announcements
  - View all notices in chronological order
  - Rich text formatting
  - Responsive design

- **Confessions**
  - Anonymous confession sharing
  - Like and interact with confessions
  - Moderation system

## Tech Stack

### Frontend
- React.js
- TailwindCSS for styling
- Socket.IO client for real-time communication
- Axios for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB for data persistence
- Socket.IO for WebSocket connections
- Mongoose ODM

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/abhay-gits/uniConnect.git
cd uniConnect
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/uniConnect
```

## Running the Application

1. Start the MongoDB server:
```bash
mongod
```

2. Start the backend server:
```bash
cd backend
npm start
```

3. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## API Endpoints

### Messages
- `GET /api/messages` - Get all messages (limited to 100)
- `POST /api/messages` - Create a new message (via Socket.IO)

### Notices
- `GET /api/notices` - Get all notices
- `POST /api/notices` - Create a new notice

### Confessions
- `GET /api/confessions` - Get all confessions
- `POST /api/confessions` - Create a new confession

## WebSocket Events

### Client -> Server
- `message` - Send a new chat message
  ```javascript
  {
    content: string,
    timestamp: Date
  }
  ```

### Server -> Client
- `message` - Receive a new message
- `messageError` - Receive error information
- `connect` - Socket connection established
- `disconnect` - Socket disconnected

## Project Structure

```
uniconnect/
├── backend/
│   ├── models/
│   │   ├── Message.js
│   │   ├── Notice.js
│   │   └── Confession.js
│   ├── routes/
│   │   ├── messages.js
│   │   ├── notices.js
│   │   └── confessions.js
│   ├── socket.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   ├── Notices.jsx
│   │   │   └── Confessions.jsx
│   │   └── App.jsx
│   └── index.html
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Error Handling

The application includes comprehensive error handling:
- Socket connection errors
- Database connection issues
- Message validation
- API endpoint errors

## Performance Considerations

- Messages are limited to the last 100 to prevent overwhelming the client
- Real-time updates using WebSocket connections
- Efficient database queries with proper indexing
- Optimized frontend rendering with React

## Security

- Input validation on both client and server
- MongoDB injection prevention
- XSS protection
- Rate limiting on API endpoints

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Email - ranaabhay254@gmail.com
