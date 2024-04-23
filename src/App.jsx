import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card'
import Searchbar from './Searchbar'
import CurvedText from './CurvedText'
import ReactCardFlip from 'react-card-flip';

function App() {
  const [playerID, setPlayerID] = useState("");
  const[isFlipped, setIsFlipped] = useState(false);
  function toggleFlip(){
    console.log('flip')
    setIsFlipped(!isFlipped);
  }
  return (
    <div>
          <Searchbar setPlayerID={setPlayerID} style={{position: "absolute"}}/>
          <div style={{display: "flex", flexDirection: 'column'}}>
            <Card playerID={playerID} style={{position: "absolute", top: "0", left: "0"}}/>  
          </div>
    </div>    
  )
}

export default App
