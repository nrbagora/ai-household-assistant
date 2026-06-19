# AI Household Assistant

A full-stack task management application that allows users to create, organize, and complete household tasks using natural language input.

## Features

* Create tasks using natural language
* Automatic task categorization
* Due date extraction (e.g., "Buy milk tomorrow")
* Mark tasks as completed
* Delete tasks
* Persistent task storage with MongoDB Atlas
* Clean productivity-focused interface
* Dockerized deployment with Docker Compose

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### DevOps

* Docker
* Docker Compose
* Git
* GitHub

## Screenshots

### Dashboard

<img width="1512" height="771" alt="Screenshot 2026-06-18 at 4 59 24 PM" src="https://github.com/user-attachments/assets/5a2ffbd5-c6c5-4ee6-bfad-a9bd08036f6b" />


### Category Filtering

<img width="1512" height="777" alt="Screenshot 2026-06-18 at 4 59 49 PM" src="https://github.com/user-attachments/assets/9da0b5e3-752d-4fc9-bace-b7b87d043fd1" />


## Project Structure

```text
ai-household-assistant/
├── client/
├── server/
├── docker-compose.yml
└── README.md
```

## Running Locally

### Clone Repository

```bash
git clone https://github.com/nrbagora/ai-household-assistant.git
cd ai-household-assistant
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_api_key
```

## Running with Docker

Build containers:

```bash
docker compose build
```

Start containers:

```bash
docker compose up
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5001
```

## Example Commands

```text
Buy milk tomorrow
Do laundry
Pay electricity bill
Clean kitchen
```

The application automatically extracts:

* Task title
* Category
* Due date (when applicable)

## Future Improvements

* User authentication
* Task priorities
* Calendar integration
* Recurring tasks
* AI-powered task parsing
* Mobile-responsive dashboard
* Task search and filtering
* Team collaboration

## Author

Neha Bagora

GitHub: https://github.com/nrbagora
