# EngiNet

EngiNet is a real-time community and messaging platform designed for engineers and candidates. It provides a seamless interface for creating communities, direct messaging, and managing profile identities.

## Features

- **Real-time Messaging**: Instant communication using WebSockets (Socket.io).
- **Community Management**: Create public or private communities with retention modes (24h, 7d, 30d).
- **Direct Messaging**: 1-on-1 private messaging with other members.
- **Dynamic Avatars**: Unique, colorful avatars generated based on user identities using the DiceBear Notionists style.
- **Profile Customization**: Edit display names and statuses (Online, Away, DND, Offline) in real-time.
- **WhatsApp-style Date Separators**: Messages are logically separated by dates (Today, Yesterday, etc.).

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite, Lucide Icons, Socket.io-client.
- **Backend**: Node.js, Express, SQLite (Sequelize ORM), Socket.io, JSON Web Tokens (JWT).

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anubhavg04/Egninet.git
   cd Egninet
   ```

2. Install Backend Dependencies & Start Server:
   ```bash
   cd backend
   npm install
   npm start
   ```

3. Install Frontend Dependencies & Start Client:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Environment Variables

Make sure to set the following environment variables in your `.env` file (if applicable):
- `JWT_SECRET`: Secret key for signing authentication tokens.
- `PORT`: Backend server port (default 3005).

## License
MIT License
