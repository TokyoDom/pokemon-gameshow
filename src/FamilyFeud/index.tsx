import React, { useState } from "react";
import Button from"react-bootstrap/Button";
import "./index.css";

type answer = {
  answer: string;
  score: number;
  guessed: boolean;
};

type gridAutoRows = {
  [key: number]: string;
};

const prompt = {
  question: "What is your favorite animal?",
  answers: [
    {
      answer: "dog",
      score: 35,
      guessed: false,
    },
    {
      answer: "cat",
      score: 30,
      guessed: false,
    },
    {
      answer: "fish",
      score: 15,
      guessed: false,
    },
    {
      answer: "horse",
      score: 10,
      guessed: false,
    },
    {
      answer: "snake",
      score: 10,
      guessed: false,
    },
  ],
};

const autoRows: gridAutoRows = {
  5: "33.3",
  6: "33.3",
  7: "25",
  8: "25",
};

function FamilyFeud() {
  const [guess, setGuess] = useState("");
  const [board, setBoard] = useState<answer[]>(prompt.answers.map(el => ({... el })));
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameOver) return;
    setGuess(e.target.value);
  };

  const handleGuess = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (gameOver) return;

    if (e.key === "Enter") {
      if (board.find((el) => el.answer === guess)) {
        const newBoard = board.map((el) => {
          if (el.answer === guess) {
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

  const playAgain = () => {
    setGuess("");
    setBoard(prompt.answers.map(el => ({... el })));
    setGameOver(false);
    setWrongAnswers([]);
  }

  return (
    <div>
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
                <span className="not-guessed">{el.answer}</span>{" "}
                <span className="not-guessed">{el.score}</span>
              </div>
            )
          )}
        </div>
      </div>
      <div className="action">{!gameOver ? (
        <input onChange={handleInput} onKeyPress={handleGuess} value={guess} />
      ) : (
        <Button variant="primary" onClick={playAgain}>Play Again</Button>
      )}</div>
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
