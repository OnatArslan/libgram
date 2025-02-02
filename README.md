# Book Social App

## Overview

Welcome to the Book Social App! This app allows users to create an account, manage a personal library, connect with friends, and engage in book-related social activities. Share your reading experiences, discover new books, and build your own community of book lovers.

## Features

- **User Accounts**: Sign up and create your profile.
- **Personal Library**: Manage your collection of books.
- **Friends List**: Add and manage your friends.
- **Real-time Chat**: Chat with your friends about your favorite books.

## Technologies Used

- **Backend**: Node.js, Express.js, Sequelize (for database management)
- **Frontend**: React.js
- **Database**: PostgreSQL
- **Real-time Communication**: Socket.io

## Installation

### Prerequisites

- Node.js (v14.x or later)
- PostgreSQL

### Steps

1. **Clone the repository**:

   ```sh
   git clone https://github.com/OnatArslan/libgram.git
   cd book-social-app
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. **Migrate the database**:

   ```sh
   npx sequelize-cli db:migrate
   ```

5. **Seed the database**:

   ```sh
   npx sequelize-cli db:seed:all
   ```

6. **Run the application**:
   ```sh
   npm start
   ```

## Usage

### Sign Up / Log In

- Create an account or log in if you already have one.
- Set up your profile by adding personal details and a profile picture.

### Manage Your Library

- Add books to your personal library.
- Edit or remove books as needed.
- View details and reviews of the books in your library.

### Friends List

- Search for friends and send friend requests.
- Accept or decline friend requests.
- View your list of friends and their libraries.

### Real-time Chat Not now

- Use the chat feature to communicate with your friends in real-time.
- Discuss your favorite books and share recommendations.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear commit messages.
4. Push your changes to your forked repository.
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please contact us at onatarslan133@gmail.com.

---

Happy Reading!
