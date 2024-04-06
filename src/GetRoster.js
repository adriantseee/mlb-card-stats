import { convertArrayToCSV } from 'convert-array-to-csv';
import fs from 'fs';

const header= ["id", "name"];

async function GetRoster(){
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
    const players = [];
    for(var team in mlbTeamIDs){
        let data = await (await fetch('https://statsapi.mlb.com/api/v1/teams/' + mlbTeamIDs[team] + '/roster')).json();
        for(var player in data.roster){
            const playerData = [data.roster[player].person.id, data.roster[player].person.fullName];
            players.push(playerData);
            console.log(playerData);
        }
    }
    return players;
}

var roster = await(GetRoster());
console.log(JSON.stringify(roster));