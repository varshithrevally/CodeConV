# CodeConV

A sleek and powerful code conversion tool that translates code snippets between various programming languages using the Google Gemini API. Built with React, TypeScript, and Tailwind CSS.

**Live Demo**: [This project is ready to be deployed! Once you deploy to Netlify, you can add your link here.](https://codeconvgemini.netlify.app/)

---

## ✨ Features

-   **Multi-Language Support**: Convert code between dozens of popular languages like Python, JavaScript, Java, Rust, and more.
-   **Side-by-Side View**: A clean, dual-panel layout for easy comparison of source and translated code.
-   **Searchable Language Selectors**: Quickly find the language you need with searchable dropdown menus.
-   **Powered by Gemini**: Leverages the cutting-edge Google Gemini API for fast and intelligent code translation.
-   **Responsive Design**: A fully responsive interface that works seamlessly on desktop and mobile devices.
-   **Loading & Error States**: A smooth user experience with clear loading indicators and helpful error messages.

## 🛠️ Tech Stack

-   **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **API**: [Google Gemini API](https://ai.google.dev/)
-   **Build Tool / Dev Server**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v18 or newer recommended)
-   `npm` (included with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/varshithrevally/CodeConV.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    *(You will first need a `package.json`. If you don't have one, run `npm init -y` and then `npm install react react-dom @types/react @types/react-dom @vitejs/plugin-react typescript vite tailwindcss postcss autoprefixer`)*
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    -   You will need a Google Gemini API key. You can get one for free from [Google AI Studio](https://aistudio.google.com/).
    -   In the root of the project, create a file named `.env`.
    -   Add your API key to the `.env` file like this:

        ```env
        VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173`.

## 🚢 Deployment to Netlify

This application is configured for easy deployment on platforms like Netlify.

1.  **Push your code to a GitHub repository.**
2.  **Log in to Netlify** and select "Add new site" -> "Import an existing project".
3.  **Connect to your GitHub repository.**
4.  **Configure build settings:**
    -   **Build command:** `npm run build` (or `vite build`)
    -   **Publish directory:** `dist`
5.  **Add environment variables:**
    -   In your Netlify site settings, go to "Site configuration" -> "Environment variables".
    -   Add a new variable:
        -   **Key:** `VITE_API_KEY`
        -   **Value:** `YOUR_GEMINI_API_KEY_HERE`
6.  **Deploy your site!** Netlify will automatically build and deploy your project.
