# 🎬 Movies App (films-app-react)

A modern, responsive, and feature-rich **Movie Discovery Application** built with React. It fetches real-time data from the TMDB API to showcase current, popular, and trending movies with a seamless user experience.

🚀 **Live Demo:** [films-app-react.vercel.app](https://vercel.app)

---
## ✨ Features

*   **Trending & Popular Movies:** Live data synchronization fetching the latest movie releases.
*   **Detailed Insights:** Comprehensive info pages displaying movie ratings, plots, and cast details.
*   **Global State Management:** Structured data flow and quick state transitions handled via Redux.
*   **Modern & Responsive UI:** Clean layouts fully optimized for mobile, tablet, and desktop screens using Chakra UI.
*   **Fast Search & Filters:** Dynamic filtering options powered by efficient TMDB API endpoints.

---

## 🛠️ Project Structure

```text
films-app-react/
├── public/            # Static assets and favicon
├── src/
│   ├── Components/    # Reusable UI components
│   ├── app/
│   │   ├── features/  # Feature-based state modules
│   │   │   ├── account/   # User authentication and account state
│   │   │   ├── actors/    # Actor profiles, details, and logic
│   │   │   ├── movies/    # Movie discovery, filters, and lists
│   │   │   └── series/    # TV series content and details
│   │   └── store.js       # Redux global store configuration
│   ├── App.css        # Main application styles
│   └── App.js         # Root application component
├── .env               # Environment variables (API Keys)
└── package.json       # Project dependencies and scripts
```

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com
    cd films-app-react
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your [The Movie Database (TMDB)](https://themoviedb.org) API key:
    ```env
    REACT_APP_TMDB_API_KEY=your_actual_api_key_here
    ```

4.  **Run the Application:**
    ```bash
    npm start
    # or
    yarn start
    ```
    Open `http://localhost:3000` in your browser to view the application.

---
