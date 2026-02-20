

export default function QuestionCard({ result, checkAnswer }) {
    return (
        <div>
            <p>{result.question}</p>
            <button onClick={() => {
                checkAnswer(result.correct_answer);
            }}>{result.correct_answer}</button>
            <button onClick={() => {
                checkAnswer(result.incorrect_answers[0]);
            }}>{result.incorrect_answers[0]}</button>
            <button onClick={() => {
                checkAnswer(result.incorrect_answers[1]);
            }}>{result.incorrect_answers[1]}</button>
            <button onClick={() => {
                checkAnswer(result.incorrect_answers[2]);
            }}>{result.incorrect_answers[2]}</button>
        </div>
    )
}