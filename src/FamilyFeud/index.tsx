import React, { useState } from "react";

function FamilyFeud() {

  const [guess, setGuess] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  }

  return (
    <div>
      <h1>Family Feud</h1>
      <p>{guess}</p>
      <input onChange={handleInput} value={guess}/>
    </div>
  )
}

export default FamilyFeud;