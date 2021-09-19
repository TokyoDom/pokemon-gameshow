import { Link } from "react-router-dom";

interface propTypes {
  questions: string[];
}

function Directory({ questions }: propTypes) {
  return (
    <div>
      {questions.map((question, i) => <Link key={i} to={`/familyfeud/${i + 1}`}>{question}</Link>)}
    </div>
  )
}

export default Directory;