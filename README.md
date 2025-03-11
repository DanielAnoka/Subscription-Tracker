# Subscription Tracker (Backend)

## Overview
Subscription Tracker is a backend service that helps users manage and track their subscriptions efficiently. It provides authentication using JWT, a database powered by MongoDB, and utilizes Arcjet and Stash for enhanced functionality.

## Features
- **User Authentication**: Secure login and registration with JWT.
- **Subscription Management**: Add, edit, and delete subscriptions.
- **Database Integration**: MongoDB for storing user and subscription data.
- **Arcjet Security**: Detects and blocks bad traffic to keep the platform secure and functional.
- **Stash Notifications**: Keeps users updated on when their subscription will end and informs them in case they want to cancel auto-renewal.

## Technologies Used
- **Backend**: Node.js & Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Other Tools**: Arcjet, Stash

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/subscription-tracker.git
   cd subscription-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add necessary configurations (e.g., MongoDB URI, JWT secret, Arcjet/Stash credentials).
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
| Method | Endpoint        | Description                   |
|--------|---------------|-------------------------------|
| POST   | `/auth/register` | Register a new user          |
| POST   | `/auth/login`    | Authenticate user and get JWT|
| GET    | `/subscriptions` | Fetch user subscriptions     |
| POST   | `/subscriptions` | Add a new subscription       |
| PUT    | `/subscriptions/:id` | Update a subscription  |
| DELETE | `/subscriptions/:id` | Remove a subscription  |

## Contribution
Contributions are welcome! Feel free to open issues or submit pull requests.



