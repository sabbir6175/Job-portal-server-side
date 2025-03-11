# Job Portal API

This is the backend API for a Job Portal built with **Node.js** and **Express**. The API provides job management functionalities, job application processing, JWT-based authentication, and user-specific job application details. The system uses **MongoDB** for data storage and handles CRUD operations for job postings and applications.

## Features

- **JWT Authentication**: Secure authentication using JWT tokens.
- **Job Management**: Allows users to create and fetch job postings.
- **Job Application Management**: Users can apply for jobs, and application data is stored in MongoDB.
- **Protected Routes**: JWT authentication middleware protects routes that require logged-in users.
- **Job Application Count**: Tracks the number of applications for each job.

## Technologies

- **Node.js**: Server-side runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store job posts and applications.
- **JWT (JSON Web Tokens)**: Authentication and authorization using tokens.
- **CORS**: Cross-origin resource sharing for secure access from specific domains.
- **dotenv**: Manage environment variables securely.
