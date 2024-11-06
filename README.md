# Blog Platform

A feature-rich blog platform built with a Node.js/Express backend and React frontend, designed for users to create, edit, and share posts. The platform includes user authentication via JWT, post interactions like likes and comments, and a dark/light theme toggle for improved user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User signup and login with JWT authentication
- Profile management with customizable bio and profile picture
- Rich text editor for post creation
- Like, dislike, and comment on posts
- Search functionality and post tagging
- Light/dark theme toggle for entire UI
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/blog-platform.git
   cd blog-platform
   ```

2. **Install dependencies for both frontend and backend:**

   **Frontend:**
   ```bash
   cd client
   npm install
   ```

   **Backend:**
   ```bash
   cd ../server
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `server` directory with the following keys:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## Configuration

- **Frontend (React):** The frontend is configured to communicate with the backend at `http://localhost:5000/api`. You can adjust this in the `api.js` file within the frontend if needed.
- **Backend (Node.js):** Ensure MongoDB is running locally or set up with MongoDB Atlas.

## Usage

1. **Start the Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the app:** Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### Auth Routes
- **POST** `/api/auth/signup` - Register a new user
- **POST** `/api/auth/login` - Login user

### User Routes
- **GET** `/api/users/:id` - Fetch user details
- **PUT** `/api/users/:id` - Update user profile

### Post Routes
- **POST** `/api/posts` - Create a new post
- **GET** `/api/posts` - Get all posts
- **GET** `/api/posts/:id` - Get post by ID
- **PUT** `/api/posts/:id` - Update post by ID
- **DELETE** `/api/posts/:id` - Delete post by ID

### Comment Routes
- **POST** `/api/posts/:id/comments` - Add a comment to a post
- **DELETE** `/api/posts/:id/comments/:commentId` - Delete a comment

### Like/Dislike Routes
- **POST** `/api/posts/:id/like` - Like a post
- **POST** `/api/posts/:id/dislike` - Dislike a post

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README template provides a clear structure to help users understand and set up your blog platform.
