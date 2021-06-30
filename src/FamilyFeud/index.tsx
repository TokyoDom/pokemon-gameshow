import React, { useState } from "react";

type answer = {
  answer: string;
  score: number;
  guessed: boolean;
};

const prompt = {
  question: "Favorite Animal?",
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
        })
        setBoard(newBoard);
      } else {
        setWrongAnswers([...wrongAnswers, guess]);
      }
    }
  };

  return (
    <div>
      <h1>Family Feud</h1>
      <h3>{prompt.question}</h3>
      <div>
        {board.map((el, i) =>
          el.guessed ? (
            <div key={i}>
              {el.score} {el.answer}
            </div>
          ) : null
        )}
      </div>
      <input onChange={handleInput} onKeyPress={handleGuess} value={guess} />
      <div>
        {wrongAnswers.map((wrongAnswer, i) => (
          <div key={i} style={{ textDecorationLine: "line-through" }}>
            {wrongAnswer}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FamilyFeud;
