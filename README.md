# Flashcard Learning ios App

A  flashcard learning application built with React Native, Express, and Xata PostgreSQL. This app allows users to create, edit, and study flashcards on iOS devices.

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
    i
    ```

## Images

![sets](https://raw.githubusercontent.com/opansida/flashcard/main/images/2024-08-20%2018.44.56.png)
![learning](https://raw.githubusercontent.com/opansida/flashcard/main/images/2024-08-20%2018.44.49.png)
![view](https://raw.githubusercontent.com/opansida/flashcard/main/images/2024-08-20%2018.44.34.png)
![storage](https://raw.githubusercontent.com/opansida/flashcard/main/images/2024-08-20%2018.44.42.png)


