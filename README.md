# Express Tutorial Codebase

This is a simple Express.js application that demonstrates basic REST API operations (CRUD) and file handling in Node.js. It manages a simple list of users stored in a JSON file.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/sougata-nayak/mern-skeleton.git
    cd express-tutorial
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Application

To start the server, run:

```bash
npm start
```

This command runs `node --watch index.js`, which restarts the server automatically when you make changes to the file.

The server will start on **port 8000**. You should see the message:
`Server running on port 8000`

## API Endpoints

The application provides the following endpoints:

### View Pages (HTML)
- `GET /`: Home page with a welcome message.
- `GET /users`: Displays a list of user names in an HTML list.

### REST API (JSON)
- **Get All Users**
    - `GET /api/users`
    - Returns a JSON array of all users.

- **Get User by ID**
    - `GET /api/users/:id`
    - Returns the user object with the specified ID.
    - Example: `/api/users/1`

- **Create User**
    - `POST /api/users`
    - Adds a new user to the list.
    - **Body (form-urlencoded)**: `name=<name>&age=<age>`

- **Update User**
    - `PATCH /api/users`
    - Updates an existing user's details.
    - **Body (form-urlencoded)**: `id=<id>&name=<new_name>&age=<new_age>`

- **Delete User**
    - `DELETE /api/users?id=<id>`
    - Removes a user with the specified ID.
    - **Query Param**: `id`

## Logging

Every request made to the server is logged to a file named `log.txt` in the root directory. The log includes the HTTP method, the URL, and the timestamp of the request.

## Data Storage

User data is persisted in a local `users.json` file. This file is read on startup and updated whenever a user is added, edited, or deleted.

## Project Structure

- `index.js`: The main application file containing the server setup, middleware, and route handlers.
- `users.json`: The data file storing the list of users.
- `log.txt`: The log file for recording incoming requests.
- `package.json`: Project metadata and dependencies.
