# Fullstack File Viewer - Monorepo

This monorepo project includes a backend API and a frontend React application designed to provide a file viewer. The backend fetches, parses, and serves CSV files, while the frontend allows users to view the list of files and select individual files for detailed viewing.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Challenge Solution](#challenge-solution)

---

## Getting Started

Ensure that you have Node.js (v14+) and npm installed on your machine. The project is organized as a monorepo to manage both the frontend and backend applications efficiently.

### Prerequisites

- Node.js v14+
- npm v6+

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pabloandura/fullstack-for-toolbox.git
   cd fullstack-for-toolbox

### Deployment Options

#### Local Development
To run the application locally:

1. **Install dependencies for both backend and frontend:**
   ```bash
   cd frontend
   npm install

   cd ..
   cd backend
   npm install
   ```
2. **Start the frontend and backend servers:**
   
   Run `npm start` in the `frontend` or `backend` directory to start the application on http://localhost, with ports `3000` and `3001`.

#### Docker Setup

To run the application in a Docker environment, both backend and frontend services are containerized. Docker ensures consistency across environments and simplifies setup.
   - Docker Compose is configured to build and manage both services.

Build and Start Services:
To build and start the application, use the following command:
```bash
docker-compose up --build
```
This command will build and start both the backend and frontend services, allowing you to access the frontend at `http://localhost:3000` and the backend API at `http://localhost:3001`.

### Frontend Application `proxy` Property in `package.json`

The `"proxy"` property in the frontend's `package.json` file is configured to simplify API requests to the backend server during development. 

#### Current Configuration for Docker Deployment

In the Docker environment, the `"proxy"` property is set to `"http://backend:3001"`, pointing to the backend service within Docker Compose. This setup allows the frontend to seamlessly route API requests to the backend without specifying the full backend URL each time, simplifying code and ensuring consistency across the Docker network.

**Docker-specific configuration:**
```json
"proxy": "http://backend:3001"
```
This configuration is used by React to forward any requests from the frontend server (e.g., `http://frontend:3000/files/list`) directly to `http://backend:3001/files/list`.

We can change it to localhost if we will opt for a local deployment.

## Project Structure

The project is organized into two main folders:

- **backend**: Contains the Express API that fetches, processes, and serves file data.
- **frontend**: Contains the React application for displaying the list of files and their content.

## Testing

In the `frontend` or `backend` directory, run:

```bash
npm test
```

## Challenge Solution

### Backend

The backend is built with Node.js and Express, providing RESTful API endpoints for managing file data. It interfaces with an external API to retrieve file listings and specific file contents, parsing and processing the data as required. Error handling is implemented to handle issues during data retrieval or processing, ensuring resilience and reliability in data fetching.

### Frontend

The frontend is developed using React with Redux Toolkit for state management and React Bootstrap for UI components. It includes a file selection interface where users can select a file and view its contents in a seamless, single-page experience. The interface handles loading states and errors effectively, displaying feedback to users as actions are performed or if issues arise.

### Monorepo Setup

This project is structured as a monorepo, allowing both the frontend and backend to coexist within a single repository. Each part has its own `package.json`, enabling independent installation and configuration. The shared root setup simplifies running scripts and managing dependencies across the entire project, making development and deployment more efficient.

### Key Challenges Solved

- **Asynchronous Data Management**: Redux Thunks are used for asynchronous API calls, managing state updates and ensuring that data flows smoothly between the backend and frontend.
- **Error Handling**: Error handling is integrated throughout both the backend and frontend, capturing and displaying errors gracefully to the user.
- **Integrated Testing**: Tests are implemented for both backend and frontend components, ensuring reliability and verifying that each part of the application functions as expected.
  
This approach ensures that the backend and frontend work cohesively within the monorepo structure, simplifying development and deployment while improving maintainability.

Thank you for reading! and the opportunity.