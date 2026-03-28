# Fitness Tracker

A full‑stack web application to log workouts, track calories, and receive personalized fitness recommendations.

🔗 **Live Demo:** [fintness-monolith.netlify.app](https://fintness-monolith.netlify.app)

---

## ✨ Features

- 🔐 **User Authentication** – Register & login with JWT
- 📊 **Activity Logging** – Add activities (running, cycling, strength, yoga) with duration, calories, and custom metrics
- 📈 **Dashboard** – View total activities, calories burned, and average duration
- 💡 **Smart Recommendations** – Get personalized improvement tips, suggestions, and safety advice
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer          | Technology |
|----------------|------------|
| **Frontend**   | React, React Router, Axios, Tailwind CSS – hosted on Netlify |
| **Backend**    | Spring Boot, Spring Security, Spring Data JPA, PostgreSQL – containerized with Docker, deployed on Render |
| **Database**   | Neon (serverless PostgreSQL) |
| **Auth**       | JWT (JSON Web Tokens) |

---

## 🏗️ Architecture

- The **React frontend** communicates with the **Spring Boot REST API**.
- JWT is stored in `localStorage` and sent with every authenticated request.
- **PostgreSQL** (Neon) stores users, activities, and recommendations.
- The backend is Dockerized and deployed on Render; the frontend is deployed on Netlify.

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Node.js 18+ & npm
- Docker (optional, for local containerized run)
- PostgreSQL (local or use Neon)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/0mkar-suryawanshi/fitness-monolith.git
   cd fitness-monolith
Configure database
Create a PostgreSQL database (e.g., fitness_db) and update src/main/resources/application.properties:

properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fitness_db
spring.datasource.username=your_username
spring.datasource.password=your_password
Run the application

bash
./mvnw spring-boot:run
The backend will start at http://localhost:8080.

Frontend Setup
Clone the repository

bash
git clone https://github.com/0mkar-suryawanshi/fitness-tracker-frontend.git
cd fitness-tracker-frontend
Install dependencies

bash
npm install
Set environment variable
Create a .env file in the root:

env
REACT_APP_API_URL=http://localhost:8080/api
Run the development server

bash
npm start
The frontend will be available at http://localhost:3000.

Now you can register a user and start logging activities.

🔐 Environment Variables
Backend (application.properties)
DB_URL – JDBC URL for PostgreSQL

DB_USERNAME – database username

DB_PASSWORD – database password

FRONTEND_URL – URL of the frontend (used for CORS)

Frontend (.env or Netlify)
REACT_APP_API_URL – base URL of the backend API (must include /api)

🌐 Deployment
Backend on Render
Push your backend code to GitHub.

Create a new Web Service on Render and connect your repository.

Choose Docker as the environment (uses your Dockerfile).

Add environment variables (see above).

Deploy.

Frontend on Netlify
Push your frontend code to GitHub.

Log in to Netlify and click New site from Git.

Connect your repository and set:

Build command: npm run build

Publish directory: build

Add the environment variable REACT_APP_API_URL pointing to your live backend (e.g., https://your-backend.onrender.com/api).

Deploy.

📚 API Documentation
Once the backend is running, you can access Swagger UI at:

text
http://localhost:8080/swagger-ui.html
Main endpoints:

POST /api/auth/register – register a new user

POST /api/auth/login – authenticate and receive JWT

GET /api/activities – get all activities (requires X-User-ID header)

POST /api/activities – create a new activity

GET /api/recommendation/user/{userId} – get recommendations for a user

GET /api/recommendation/activity/{activityId} – get recommendations for an activity

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.


🙏 Acknowledgements
Spring Boot – backend framework

React – frontend library

Neon – serverless PostgreSQL

Render – backend hosting

Netlify – frontend hosting

Built with ❤️ by Omkar Suryawanshi
