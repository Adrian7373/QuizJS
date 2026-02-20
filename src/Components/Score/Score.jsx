import style from "./Score.module.css";

export default function Score({ score }) {
    return (
        <div className={style.container}>
            <p className={style.score}>Score:{score}</p>
        </div>
    )
}