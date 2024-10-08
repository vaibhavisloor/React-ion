# Real-Time Messaging App

## Description

This is a real-time messaging app that allows users to join chat rooms and send messages instantly. Built using **React** for the frontend and **Node.js** with **Express** and **Socket.io** for real-time communication, the app provides a seamless experience for users to communicate in different chat rooms.

## Features

- **Real-time messaging** using WebSockets.
- **Multiple chat rooms**: Users can join or create any chat room by specifying the room name.
- **Responsive UI** for an optimal user experience across devices.
- **Username and Room validation** to ensure proper room management.

## Tech Stack

- **Frontend**: React with Hooks
- **Backend**: Node.js, Express.js
- **Real-Time Communication**: Socket.io
- **Other Libraries**: `query-string` for parsing query parameters

## Installation Guide

### Prerequisites

- **Node.js** and **npm** (Node Package Manager) installed on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/real-time-messaging-app.git
cd real-time-messaging-app
```

### 2. Install Dependencies

#### For the backend:

```bash
cd Server
npm install
```

#### For the frontend:

```bash
cd ../client
npm install
```

### 3. Running the Project

#### Start the backend server:

```bash
cd Server
npm start
```

#### Start the frontend React app:

```bash
cd ../client
npm start
```

The frontend will run on `http://localhost:3000` and the backend server on `http://localhost:5000`.

## Contributing

Feel free to fork this repository and create pull requests if you'd like to contribute to improving the project.

## License

This project is open source and available under the [MIT License](LICENSE).
```
