export default function GameOver({ winner, onRematch }) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>it is fucking draw!</p>}
            <p><button onClick={onRematch}>Rematch!</button></p>
        </div>
    )
}