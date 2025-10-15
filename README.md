# Code Review Assistant

An AI-powered tool to automatically review your code, provide feedback, and suggest improvements.

## Demo Video

[Watch a demo of the Code Review Assistant]()

## Features

*   **Automated Code Reviews:** Get instant feedback on your code's quality, style, and correctness.
*   **AI-Powered Suggestions:** Leverage the power of Google's Gemini to get intelligent code improvements.
*   **File Upload:** Easily upload your code files for review.
*   **Review History:** Keep track of your past code reviews.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/code-review-assistant.git
    cd code-review-assistant
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Set up your environment variables:**
    Create a `.env.local` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

2.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Deployment

This application can be easily deployed to any static site hosting service. Here are a few recommendations:

*   **Vercel**
*   **Netlify**
*   **GitHub Pages**

For a detailed guide on how to deploy, please refer to the documentation of your chosen hosting provider. Remember to set the `GEMINI_API_KEY` environment variable in your hosting provider's settings.

## Technology Stack

*   **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
*   **Bundler:** [Vite](https://vitejs.dev/)
*   **AI:** [Google Gemini](https://ai.google.dev/)
*   **Styling:** [Lucide React](https://lucide.dev/guide/react) for icons