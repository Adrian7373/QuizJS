"use client";

import { useState, useEffect, useRef } from "react";
import style from "./page.module.css";
import QuestionCard from "@/Components/QuestionCard/QuestionCard";
import Score from "@/Components/Score/Score";
import Timer from "@/Components/Timer/Timer";
import StartButton from "@/Components/StartButton/StartButton";
import { ScoreTimeContext } from "@/context/ScoreTime";
import DifficultySelector from "@/Components/DifficultySelector/DifficultySelector";

export default function Home() {

  const [questions, setQuestions] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(15000);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const intervalRef = useRef(null);

  const fetchQuestions = () => {
    const rateLimiter = setTimeout(async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }, 3000);

  }

  useEffect(() => {
    fetchQuestions();
  }, [difficulty]);

  useEffect(() => {
    if (questions && isRunning && !isLoading) {
      setCountdown(15000);
      intervalRef.current = setInterval(() => {
        setCountdown((prevTime) => prevTime - 1000);
      }, 1000);
      console.log("Timer started");
    }
    return () => clearInterval(intervalRef.current);
  }, [questionIndex, isRunning, isLoading])

  /*
  useEffect(() => {
    if (countdown <= 0) {
      setQuestionIndex((index) => index + 1);
    }
  }, [countdown]); */

  const checkAnswer = (answer) => {
    if (answer === questions.results[questionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setQuestionIndex((prevIndex) => prevIndex + 1)
  }

  const startGame = () => {
    if (isFinished) {
      setIsLoading(true);
      fetchQuestions();
    }
    setQuestionIndex(0);
    setScore(0);
    setIsRunning(true);
  }

  const selectDifficulty = (difficulty) => {
    setIsLoading(true);
    setQuestions(null);
    setDifficulty(difficulty);
    setIsRunning(false);
  }

  if (isLoading) {
    return (
      <div>Fetching Questions</div>
    )
  }


  const isFinished = questions?.results && questionIndex >= questions.results.length;


  if (questions && !isFinished && isRunning) {
    return (
      <div className={style.mainDiv}>
        <ScoreTimeContext.Provider value={{
          score,
          countdown
        }}>
          <QuestionCard
            result={questions.results[questionIndex]}
            checkAnswer={checkAnswer}
            score={<Score />}
            timer={<Timer />}
          ></QuestionCard>
        </ScoreTimeContext.Provider>
      </div>
    )
  } else if (!isRunning) {
    return (
      <div>
        <h1>Start Game</h1>
        <DifficultySelector
          selectDifficulty={selectDifficulty}
          difficulty={difficulty}
        />
        < StartButton
          start={startGame}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h1>Game Over</h1>
        <ScoreTimeContext.Provider value={{ score }}>
          <Score
            score={score}
          />
        </ScoreTimeContext.Provider>
        <DifficultySelector
          selectDifficulty={selectDifficulty}
          difficulty={difficulty}
        />
        <StartButton
          start={startGame}
        />
      </div>
    )
  }
}