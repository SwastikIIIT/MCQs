# React MCQ Quiz Application

<div align="center">
  
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![OpenTDB](https://img.shields.io/badge/OpenTDB-API-orange?style=for-the-badge)

</div>

A modern, interactive multiple-choice quiz application built with React and Vite. This application fetches trivia questions from a public API and presents them in a clean, user-friendly interface.

<div align="center">
  <img src="https://github.com/user-attachments/assets/288cbe60-e207-4c7f-a10f-99b3fa1014ff" alt="React Quiz App Screenshot" />
</div>

## ✨ Features

- **📊 Dynamic Question Fetching**: Quiz questions are fetched from the Open Trivia Database API
- **🔍 One-Question-Per-Screen Design**: Clean interface showing a single question at a time
- **👆 Interactive Answer Selection**: List-style answer options with visual feedback
- **🧭 Navigation System**: Move forward and backward between questions
- **📈 Progress Tracking**: Visual progress bar showing completion percentage
- **🎯 Score Calculation**: Automatic scoring based on correct answers
- **📋 Results Summary**: Detailed end screen with performance feedback
- **🔄 Quiz Review**: Review all questions with correct answers after completion
- **🔄 Fresh Quiz Option**: Option to start a new quiz with fresh questions

## 🚀 Technologies Used

- **⚛️ React 18**: Modern component-based UI library
- **⚡ Vite**: Next-generation frontend tooling for faster development
- **🎨 Tailwind CSS**: Utility-first CSS framework for styling
- **🖌️ Lucide React**: Beautiful, consistent icons
- **🌐 OpenTDB API**: Free trivia question database

## 🏁 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/SwastikIIIT/MCQs.git
   cd MCQs
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser to the displayed local URL (typically `http://localhost:5173`)

## 📁 Project Structure

```
MCQs/
├── src/
│   ├── components/     # Reusable UI components including MainCard
│   ├── utils/          # Utility functions for decodHTML function
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── public/             # Static assets
└── index.html          # HTML entry point
```

## ⚙️ Customization

You can customize the quiz by modifying the API call parameters in the `fetchQuestions` function to get different categories, difficulty levels, or number of questions:

```javascript
// Example customization
const fetchQuestions = async () => {
  const category = 9; // General Knowledge
  const difficulty = 'medium';
  const amount = 10;
  
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  // ...processing
};
```

## 🔨 Building for Production

Run the following command to create an optimized production build in the `dist/` folder:

```bash
npm run build
```

## 🔍 Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 📱 Responsive Design

The application is fully responsive and works well on devices of all sizes - from mobile phones to large desktop displays.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

[MIT](LICENSE)

