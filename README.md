# 🚀 AI Image Renamer

An intelligent, SEO-focused image management tool that leverages **Google Gemini AI** to automatically rename images based on their visual content. Perfect for web developers, content creators, and SEO professionals who need bulk, descriptive, and web-ready filenames instantly.

[![Gitleaks](https://github.com/RamonRiosJr/AI-Image-Renamer/actions/workflows/gitleaks.yml/badge.svg)](https://github.com/RamonRiosJr/AI-Image-Renamer/actions/workflows/gitleaks.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **AI-Powered Analysis**: Uses `gemini-2.0-flash` to "see" your images and generate accurate descriptions.
- **SEO Optimization**: Automatically formats names for web (lowercase, hyphens, descriptive keywords).
- **Bulk Processing**: Upload multiple images and process them in parallel.
- **Instant Preview**: View original vs. suggested names before downloading.
- **Privacy First**: Your API key stays in your environment; images are processed client-side.
- **Modern UI**: Dark-mode primary, glassmorphism design with sleek animations.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Google Generative AI (Gemini)](https://aistudio.google.com/app/apikey)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A **Google Gemini API Key**. You can get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/RamonRiosJr/AI-Image-Renamer.git
    cd AI-Image-Renamer
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env.local` file in the root directory:

    ```bash
    cp .env.example .env.local
    ```

    Edit `.env.local` and add your Gemini API key:

    ```env
    GEMINI_API_KEY=your_actual_key_here
    ```

4. **Run the application**:

    ```bash
    npm run dev
    ```

    Open `http://localhost:3000` in your browser.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ by [Ramon Rios](https://github.com/RamonRiosJr)
