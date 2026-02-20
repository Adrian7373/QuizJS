"use client";

import { useState, useEffect, useRef } from "react";
import style from "./page.module.css";
import QuestionCard from "@/Components/QuestionCard/QuestionCard";
import Score from "@/Components/Score/Score";
import Timer from "@/Components/Timer/Timer";
import StartButton from "@/Components/StartButton/StartButton";

export default function Home() {

  const [questions, setQuestions] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(15000);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
      const data = await response.json();
      setQuestions(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

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

  useEffect(() => {
    if (countdown <= 0) {
      setQuestionIndex((index) => index + 1);
    }
  }, [countdown]);

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

  if (isLoading) {
    return (
      <div>Fetching Questions</div>
    )
  }

  const isFinished = questions && questionIndex >= questions.results.length;

  if (questions && !isFinished && isRunning) {
    return (
      <div className={style.mainDiv}>
        <Timer
          timeLeft={countdown}
        />
        <Score
          score={score}
        />
        <QuestionCard
          result={questions.results[questionIndex]}
          checkAnswer={checkAnswer}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Score
          score={score}
        />
        <StartButton
          start={startGame}
        />
      </div>
    )
  }
}