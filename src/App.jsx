import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card'
import Searchbar from './Searchbar'

function App() {
  const [playerID, setPlayerID] = useState("");
  return (
    <div>
        <Searchbar setPlayerID={setPlayerID}/>
        <Card playerID={playerID} />
    </div>
  )
}

export default App
