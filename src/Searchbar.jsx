import {useState} from 'react';
import data from './Players.json';

function Searchbar({ setPlayerID }){
    const mlbTeamIDs = {
        "AZ": "109",
        "ATL": "144",
        "BAL": "110",
        "BOS": "111",
        "CWS": "145",
        "CHC": "112",
        "CIN": "113",
        "CLE": "114",
        "COL": "115",
        "DET": "116",
        "HOU": "117",
        "KC": "118",
        "LAA": "108",
        "LAD": "119",
        "MIA": "146",
        "MIL": "158",
        "MIN": "142",
        "NYY": "147",
        "NYM": "121",
        "OAK": "133",
        "PHI": "143",
        "PIT": "134",
        "SD": "135",
        "SF": "137",
        "SEA": "136",
        "STL": "138",
        "TB": "139",
        "TEX": "140",
        "TOR": "141",
        "WSH": "120"
    }
    
    const [players, setPlayers] = useState([]);
    const [query, setQuery] = useState("");
    return (
        <div className="searchbar-conatiner">
            <div className="searchbar">
                <input type="text" placeholder="Search for a player" onChange={e => setQuery(e.target.value)}/>
            </div>
            <div className="search-results">
                {
                data.filter(player => player[1].toLowerCase().includes(query.toLowerCase())).map(player => {
                    if(query.length < 4)
                    {
                        return null;
                    }
                    else{
                        return (
                            <button className="search-result" key={player[0]} onClick={() => setPlayerID(player[0])}>
                                <div className="search-result" key={player.id}>
                                    <h1 style={{color: "white"}}>{player[1]}</h1>
                                </div>
                            </button>
                        );
                    }
                })}

            </div>
        </div>
    );
}

export default Searchbar;