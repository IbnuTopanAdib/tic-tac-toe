import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName }) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleClick() {
        setIsEditing(editing => !editing);
        onChangeName(symbol, playerName);
    }

    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {
                    isEditing
                        ? <input type="text" value={playerName} onChange={handleChange} />
                        : <span className="player-name">{playerName}</span>
                }

                <span className="player-symbol">{symbol}</span>
                <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
            </span>
        </li>
    )
}