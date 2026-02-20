import style from "./Timer.module.css";

export default function Timer({ timeLeft }) {
    return (
        <div className={style.timer}>
            <p className={style.time}>{timeLeft / 1000}</p>
        </div>
    )
}