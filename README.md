# Work India Assigment (IRCTC-like Application)

This API is a real-time railway management system built using Node.js and MySQL. The system allows users to check train availability, book seats, and manage train data with role-based access for users and admins.

## Features

### User Functionality

1. Register: Users can register an account.

2. Login: Users can log in to the system and receive a JWT token.

3. Check Train Availability: Fetch available trains between two stations with seat availability.

4. Book Seats: Book a seat on a specific train if seats are available.

5. Booking Details: Retrieve details of booked tickets.

### Admin Functionality

1. Add New Train: Admins can add new trains to the database.

2. Update Train Details: Admins can update train information such as total seats.

3. Role-Based Access: Admin API endpoints are protected and can only be accessed using admin tokens.


## Tech Stack

- Backend: Node.js with Express.js

- Database: MySQL

- Authentication: JSON Web Tokens (JWT)

- Environment Variables: dotenv


## Installation and Setup

### Steps

1. Clone Repository

   ```git clone https://github.com/priyansh673/WorkIndia_IRCTC```
   
   ```cd WorkIndia_IRCTC```

2. Install Dependencies

   ```npm install```

3. Set up .env

   ```PORT=2432```
   
   ```JWT_SECRET=your_jwt_secret```
   
   ```DB_HOST=localhost```
   
   ```DB_USER=root```
   
   ```DB_PASSWORD=your_db_password```
   
   ```DB_NAME=railway_db```

5. Create MySQL Database

6. Start Server

   ```npm start```


