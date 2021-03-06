import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./index.css";

type answer = {
  answer: string;
  score: number;
  guessed: boolean;
};

type gridAutoRows = {
  [key: number]: string;
};

const autoRows: gridAutoRows = {
  5: "33.3",
  6: "33.3",
  7: "25",
  8: "25",
};

interface propTypes {
  idx: number;
  length: number;
  prompt: {
    question: string;
    answers: answer[];
  };
}

function FamilyFeud({ idx, prompt, length }: propTypes) {
  const [guess, setGuess] = useState("");
  const [board, setBoard] = useState<answer[]>(
    prompt.answers.map((el) => ({ ...el }))
  );
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameOver) return;
    setGuess(e.target.value);
  };

  const handleGuess = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (gameOver || !guess) return;

    if (e.key === "Enter") {
      if (board.find((el) => el.answer.toLowerCase() === guess.toLowerCase())) {
        const newBoard = board.map((el) => {
          if (el.answer.toLowerCase() === guess.toLowerCase()) {
            el.guessed = true;
          }
          return el;
        });
        setBoard(newBoard);
        isGameOver(newBoard, wrongAnswers);
      } else {
        const newWrongs = [...wrongAnswers, guess];
        setWrongAnswers(newWrongs);
        isGameOver(board, newWrongs);
      }

      setGuess("");
    }
  };

  const isGameOver = (board: answer[], wrongAnswers: string[]) => {
    if (
      !(wrongAnswers.length < 3 && board.some((el) => el.guessed === false))
    ) {
      //the game stops
      setGameOver(true);
    }
  };

  const renderPlayAgain = () => {
    const numbers = [];
    for (let i = 1; i <= length; i++) {
      if (i !== idx) numbers.push(i);
    }

    return (
      <Button color="primary">Play Again</Button>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        <h3>{prompt.question}</h3>
        <div
          className="answers"
          style={{ gridAutoRows: autoRows[board.length] }}
        >
          {board.map((el, i) =>
            el.guessed ? (
              <div key={i}>
                <span>{el.answer}</span> <span>{el.score}</span>
              </div>
            ) : (
              <div key={i}>
                <span
                  className={gameOver ? "not-guessed-gameover" : "not-guessed"}
                >
                  {gameOver ? el.answer : "no guess"}
                </span>{" "}
                <span
                  className={gameOver ? "not-guessed-gameover" : "not-guessed"}
                >
                  {gameOver ? el.score : 0}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="action">
        {renderBoard()}
        {!gameOver ? (
          <input
            onChange={handleInput}
            onKeyPress={handleGuess}
            value={guess}
          />
        ) : (
          renderPlayAgain()
        )}
      </div>
      <div className="wrong-answers">
        {wrongAnswers.map((wrongAnswer, i) => (
          <div key={i} className="wrong-answer">
            {wrongAnswer}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FamilyFeud;
