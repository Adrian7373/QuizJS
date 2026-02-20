# QuizJS 🧠⏳

QuizJS is an interactive, timed trivia application built using **Next.js** and **React**. Test your knowledge with dynamically generated questions from the Open Trivia Database, beat the 15-second clock, and track your high score!

## 🚀 Features

* **Dynamic Trivia:** Automatically fetches 10 random multiple-choice questions per game using the [Open Trivia Database (OpenTDB) API](https://opentdb.com/).
* **Countdown Timer:** The pressure is on! You have exactly 15 seconds to answer each question. If the timer hits zero, the game automatically advances to the next question.
* **Score Tracking:** Keeps a running tally of your correct answers.
* **Seamless Replayability:** Once you finish the 10 questions, you can instantly hit "Start" to fetch a fresh batch of questions and play again.
* **Component-Based UI:** Built with clean, separate React components for the timer, score, question cards, and start button.

## 🛠️ Technologies Used

* **Framework:** [Next.js](https://nextjs.org/) (v16.1.6)
* **Library:** [React](https://react.dev/) (v19.2.3)
* **API:** [Open Trivia Database](https://opentdb.com/)
* **Styling:** CSS Modules

## 📂 Project Structure

```text
/src
├── app
│   ├── page.jsx                # Main game logic, state management, and API fetching
│   └── page.module.css         # Main layout styling
└── Components
    ├── QuestionCard
    │   └── QuestionCard.jsx    # Renders the current question and answer buttons
    ├── Score
    │   ├── Score.jsx           # Displays the current score
    │   └── Score.module.css
    ├── StartButton
    │   └── StartButton.jsx     # Button to initialize/restart the game
    └── Timer
        ├── Timer.jsx           # Renders the countdown timer (15s to 0s)
        └── Timer.module.css

```

## 🔧 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install

```

Then, run the development server:

```bash
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to start playing!

## 🔮 Future Improvements

* **Answer Shuffling:** Currently, the correct answer and incorrect answers render in a fixed order. An excellent next step would be implementing a randomizer array (like the Fisher-Yates shuffle) in `QuestionCard.jsx` so the correct answer moves around!
* **Difficulty Selection:** Add a dropdown menu to let users pass a `&difficulty=easy/medium/hard` parameter into the API fetch URL.
* **End Screen:** Add a dedicated "Game Over" screen that displays the final percentage score and feedback before showing the restart button.

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or UI improvements, feel free to fork the repository and submit a pull request.

---

Made with ❤️ by Adrian Ablaza
