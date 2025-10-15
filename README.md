# Code Review Assistant

An AI-powered tool to automatically review your code, provide feedback, and suggest improvements.

## Demo Video

[Watch a demo of the Code Review Assistant](https://drive.google.com/file/d/1dS26otR_XSqC40NPV9OriAmniAXhiG7V/view?usp=sharing)

## Deployed Project
* [Link for deployed Project](https://code-review-ai-pearl.vercel.app) 
* This project is deployed with [Vercel](https://vercel.com)

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
    git clone https://github.com/reachforaryan/Code-Review-AI.git
    cd Code-Review-AI
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

This application is deployed on Vercel at `https://code-review-ai-pearl.vercel.app`.

## Technology Stack

*   **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
*   **Bundler:** [Vite](https://vitejs.dev/)
*   **AI:** [Google Gemini](https://ai.google.dev/)
*   **Styling:** [Lucide React](https://lucide.dev/guide/react) for icons