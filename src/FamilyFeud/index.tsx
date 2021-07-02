import React, { useState } from "react";
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
  const [board, setBoard] = useState<answer[]>(prompt.answers);
  const [wrongAnswers, setWrongAnswers] = useState<string[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (wrongAnswers.length >= 3) return;
    setGuess(e.target.value);
  };

  const handleGuess = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (wrongAnswers.length >= 3) return;

    if (e.key === "Enter") {
      if (board.find((el) => el.answer === guess)) {
        const newBoard = board.map((el) => {
          if (el.answer === guess) {
            el.guessed = true;
          }
          return el;
        });
        setBoard(newBoard);
      } else {
        setWrongAnswers([...wrongAnswers, guess]);
      }

      setGuess("");
    }
  };

  return (
    <div>
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
        <div>
          {wrongAnswers.map((wrongAnswer, i) => (
            <div key={i} style={{ textDecorationLine: "line-through" }}>
              {wrongAnswer}
            </div>
          ))}
        </div>
      </div>
      <input onChange={handleInput} onKeyPress={handleGuess} value={guess} />
    </div>
  );
}

export default FamilyFeud;
