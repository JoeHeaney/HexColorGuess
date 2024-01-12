import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const[color, setColor] = useState("");
  const[answers, setAns] = useState<string[]>([]);
  const[result, setResult] = useState<Result | undefined>(undefined);

  enum Result{
    Correct,
    Wrong,
  }

  const getRandColor = () => {
    const digits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

    const color = new Array(6).fill('').map(() => digits[Math.floor((Math.random() * digits.length))]).join('');
    return `#${color}`;
  }

  const generateColor = () =>{
    const realColor = getRandColor();
    setColor(realColor);
    setAns([realColor, getRandColor(), getRandColor()].sort(() => 0.5- Math.random()))
  }

  useEffect(() => {
    generateColor();
  }, [])



  const  handledAnswerClicked = (answer: string) => {
    if(answer===color){
      setResult(Result.Correct);
      generateColor();
    } else{
      setResult(Result.Wrong);
    }
  }

  return <div className='App'>
    <div>
      
      <div className='guess-me' style={{background: color}}></div>

      {answers.map( answer => (
        <button 
          onClick={() => handledAnswerClicked(answer)} key={answer}>
            {answer}
          </button>
      ))}

    {result === Result.Wrong && <div className='wrong'>Wrong Answer</div>}
    {result === Result.Correct && <div className='correct'>Correct Answer</div>}
    </div>
  </div>
}

export default App
