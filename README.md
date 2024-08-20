# Fullstack Flashcard Learning App

A cross-platform flashcard learning application built with React Native, Express, and Xata PostgreSQL. This app allows users to create, edit, and study flashcards on both iOS and Android devices.

## Features

- Create, edit, and delete flashcard decks and individual cards.
- Study flashcards and track your progress with scoring.
- View local PDF eBooks within the app.
- Supports offline mode for studying without an active internet connection.

## Technologies

- **React Native**: Frontend for building a responsive cross-platform mobile app.
- **Express**: Backend framework handling API requests and business logic.
- **Xata PostgreSQL**: Database for storing user data, flashcard content, and metadata.

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/flashcard-app.git
    cd flashcard-app
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    ```

3. Set up environment variables by creating a `.env` file in the `server` directory:
    ```
    DATABASE_URL=your_database_url
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Run the React Native app on a simulator or device:
    ```bash
    cd client
    npm start
    ```

## Testing

This project uses GitHub Actions for continuous integration. Automated tests are run on every push and pull request to the `main` branch.

## License

This project is licensed under the MIT License.
