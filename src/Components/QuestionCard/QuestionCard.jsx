import { useMemo } from "react";
import style from "./QuestionCard.module.css";

export default function QuestionCard({ result, checkAnswer, score, timer }) {

    const shuffledAnswers = useMemo(() => {
        const combined = [...result.incorrect_answers, result.correct_answer];
        combined.sort(() => Math.random() - 0.5)
        console.log(combined);
        return combined;
    }, [result]);

    return (
        <div className={style.card}>
            <div className={style.info}>{score}{timer}</div>
            <p className={style.question} dangerouslySetInnerHTML={{ __html: result.question }}></p>
            <div className={style.answers}>
                {shuffledAnswers.map((answer, index) => {
                    return <button key={index} onClick={() => checkAnswer(answer)}>{answer}</button>
                })}
            </div>
        </div>
    )
}
