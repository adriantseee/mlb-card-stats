import {useEffect, useState} from 'react';
import ReactCurvedText from 'react-curved-text';
import './Card.css'
import ReactCardFlip from 'react-card-flip';

function Card({playerID}){
    const [isFlipped, setIsFlipped] = useState(false);
    const [player, setPlayer] = useState("");
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState("");
    
    //team colors: first is background color, second is text color, third is shadow color, fourth is second background color to produce gradient
    let teamColors = {
        "109": ["#ad9f79", "#3ec1cc", "#FFD1D9", "#A71930"],
        "144": ["#13274F", "#CE1141", "#A6B1C0", "#9d041f"],
        "110": ["#DF4601", "#000000", "#FFA17C", "#FFD1A1"],
        //Could change text color to white or keep, depending on jerseys
        "111": ["#191f2f", "#0C2340", "#FFA1A1", "#BD3039"],
        "145": ["#C4CED4", "#FFFFFF", "#808080", "#000000"],
        "112": ["#0E3386", "#CC3433", "#A1A1FF", "#cc3433"],
        "113": ["#C6011F", "#FFFFFF", "#FFA1A1", "#000000"],
        "114": ["#0C2340", "#E31937", "#A1A1FF", "#a91024"],
        "115": ["#333366", "#C4CED4", "#808080", "#d0d0d0"],
        "116": ["#0C2C56", "#FA4616", "#A1A1FF", "#cd5316"],
        "117": ["#f5c174", "white", "#000000", "#e45543"],
        "118": ["#004687", "#BD9B60", "#FFFFFF" , "#7a92c2"],
        "108": ["#003263", "#BA0021", "#A1A1FF" , "#BA0021"],
        "119": ["#005A9C", "#FFFFFF", "#00C2FF", "#A1A1FF"],
        "146": ["#00A3E0", "#FF6600", "#A1A1FF", "#FF6600"],
        "158": ["#FFC52F", "#132140", "#FFEFA1", "#647588"],
        "142": ["#002B5C", "#D31145", "#A1A1FF", "#D31145"],
        "147": ["#003087", "#FFFFFF", "#808080", "#93c2c9"],
        "121": ["#002D72", "#FF5910", "#A1A1FF", "#FF5910"],
        "133": ["#003831", "#EFB21E", "#A1A1FF", "#EFB21E"],
        "143": ["#E81828", "#FFFFFF", "#FFA1A1", "#003087"],
        //Might need to change background, not sure to what though
        "134": ["#d0af74", "#27251F", "#FFD1A1", "#c89922"],
        "135": ["#d6a416", "#FFFFFF", "#808080", "#2a1e1e"],
        "137": ["#FD5A1E", "#27251F", "#FFA1A1", "#27251F"],
        "136": ["#0C2C56", "#FFFFFF", "#A1A1FF", "#005C5C"],
        "138": ["#C41E3A", "#FFFFFF", "#FFA1A1", "#0C2340"],
        //Could change to white if suited better
        "139": ["#092C5C", "#8FBCE6", "#FFFFFF", "#6f839f"],
        "140": ["#003278", "#C0111F", "#A1A1FF", "#C0111F"],
        "141": ["#134A8E", "#e8291c", "#FFFFFF", "#5ba4b4"],
        "120": ["#AB0003", "#FFFFFF", "#808080" , "#14225A" ]
    }
    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            var data = []
            data.push((await GetPlayer({playerID: playerID})));
            console.log(data[0].people[0].id);
            data.push((await GetPlayerStats({playerID: playerID}, data[0].people[0].primaryPosition.abbreviation === "P" ? true : false)));
            var newPlayer = await(arrangeData(data));
            setPlayer(newPlayer);
            var playerImage = await(getImage(playerID));
            console.log(playerImage);
            setImage(playerImage);
            setLoading(false);
        }
        fetchData();
    }, [playerID]);

    async function GetPlayer({playerID}){
        let data = await (await fetch('https://statsapi.mlb.com/api/v1/people/' + playerID)).json();
        return data;
    }

    async function GetPlayerStats({playerID}, pitcher){
        if(pitcher){
            let data = await (await fetch('https://statsapi.mlb.com/api/v1/people/' + playerID  + '/stats?stats=statsSingleSeason&group=pitching')).json();
            return data;
        }
        else{
            let data = await (await fetch('https://statsapi.mlb.com/api/v1/people/' + playerID  + '/stats?stats=statsSingleSeason&group=hitting')).json();
            return data;
        }
    }

    async function arrangeData(data){
        var id = data[0].people[0].id;
        var name = data[0].people[0].useName;
        var surname = data[0].people[0].useLastName;
        var nickname = data[0].people[0].nickName;
        var position = data[0].people[0].primaryPosition.abbreviation;
        var teamID = data[1].stats[0].splits[0].team.id;
        var hand = data[0].people[0].batSide.code;
        //stats
        var stats = [];
        if(position === "P"){
            var era = data[1].stats[0].splits[0].stat.era;
            var whip = data[1].stats[0].splits[0].stat.whip;
            var k9 = data[1].stats[0].splits[0].stat.strikeoutsPer9Inn;
            var bb9 = data[1].stats[0].splits[0].stat.walksPer9Inn;
            stats = [era, whip, k9, bb9];
        }
        else{
            var avg = data[1].stats[0].splits[0].stat.avg;
            var hits = data[1].stats[0].splits[0].stat.hits;
            var hr = data[1].stats[0].splits[0].stat.homeRuns;
            var rbi = data[1].stats[0].splits[0].stat.rbi;
            stats = [avg, hits, hr, rbi];
        }
        var newPlayer = new Player(id, name, surname, nickname, position, teamID, hand, stats);
        console.log("player", newPlayer);
        return newPlayer;
    }

    async function getImage(playerID){
        console.log("in function: ", playerID)
        const url = 'https://remove-background-image2.p.rapidapi.com/remove-background?image_url=' + 'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:action:hero:current.jpg/q_auto:good,w_1500/v1/people/'+ playerID  +'/action/hero/current';
        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': '0103129491msh74a6451c2690a8dp17a103jsn14753a75e97f',
                'X-RapidAPI-Host': 'remove-background-image2.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const status = await result.status;
            if(status){
                const image = result.image;
                const imageContent = atob(image);
                const buffer = new ArrayBuffer(imageContent.length);
                const view = new Uint8Array(buffer);
                for (let n = 0; n < imageContent.length; n++) {
                    view[n] = imageContent.charCodeAt(n);
                }
                const type = 'image/png';
                const blob = new Blob([buffer], { type });
                const playerImage = new File([blob], "player-image", { type });
                const url = URL.createObjectURL(playerImage)
                console.log(playerImage);
                return url;
            }
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    function toggleFlip(){
        setIsFlipped(!isFlipped);
    }

    class Player {
        constructor(id, name, surname, nickname, position, teamID, hand, stats) {
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.nickname = nickname;
            this.position = position;
            this.teamID = teamID;
            this.hand = hand;
            this.stats = stats;
        }
    }

    return(
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            {/*front of card*/}
            <div className="card-container">
                <div className="card" style={{backgroundImage: teamColors[player.teamID] !== undefined ? ( loading ? "white" : ("linear-gradient(135deg, " + teamColors[player.teamID][0] + ", " + teamColors[player.teamID][3] + ")")) : "white", color: teamColors[player.teamID] !== undefined ? teamColors[player.teamID][1]: "white"}} onClick={toggleFlip}>
                    {
                    loading ? 
                    <>
                        <img src="baseball-icon.png" className='loading-icon'/>
                    </>
                    :
                    <>
                        <div className="player-name-container" style={{left: player !== undefined ? (player.hand == "R" ? "2vh" : "auto") : "auto", right: player !== undefined ? (player.hand == "L" ? "2vh" : "0vh") : "auto"}}>
                            <div className="player-name" style={{display: "flex", flexDirection: "column", alignItems: player !== undefined ? (player.hand == "R" ? "start" : "end") : "center"}}>
                                <h1 style={{ margin: player !== undefined ? (player.hand == "R" ? "0 0 0 0.5vh" : "0 0.5vh 0 0" ) : "0 0 0 0",textShadow: "0.25vh 0.25vh" + (teamColors[player.teamID] !== undefined ? teamColors[player.teamID][2] : "white")}}>{player.name}</h1>
                                <h1 style={{ margin: player !== undefined ? (player.hand == "R" ? "0 0 0 0.5vh" : "0 0.5vh 0 0" ) : "0 0 0 0", textShadow: "0.25vh 0.25vh" + (teamColors[player.teamID] !== undefined ? teamColors[player.teamID][2] : "white")}}>{player.surname}</h1>
                            </div>
                        </div>
                        <div className="logo-container" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: player !== undefined ? (player.hand == "R" ? "end" : "start") : "center"}}>
                            <img className="logo" src={"https://www.mlbstatic.com/team-logos/team-cap-on-dark/"+ player.teamID  +".svg"} alt="" />
                        </div>
                        <div className="position-container" style={{display: "flex", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: player !== undefined ? (player.hand == "R" ? "start" : "end") : "center"}}>
                            <div className='position' style={{width: "8vh",  margin: player !== undefined ? (player.hand == "R" ? "0 0 0 0.5vh" : "0 0.5vh 0 0" ) : "0 0 0 0", marginBottom: "0.5vh"}}>
                                <h2>{player.position}</h2>
                            </div>
                        </div>
                        <div className="card-image-container">
                                {//<img className="card-image" src={image}/>
                                <img className="card-image" src={image} alt="" />
                                }
                        </div>
                    </>
                    }
                </div>
            </div>
            {/*back of card*/}
            <div className="card-container">
                <div className="card" style={{backgroundImage: teamColors[player.teamID] !== undefined ? ( loading ? "white" : ("linear-gradient(135deg, " + teamColors[player.teamID][0] + ", " + teamColors[player.teamID][3] + ")")) : "white", color: teamColors[player.teamID] !== undefined ? teamColors[player.teamID][1]: "white", display: "flex", flexDirection: "column", justifyContent: "space-around"}} onClick={toggleFlip}>
                    <div className="nickname-container" style={{marginTop: "10%"}}>
                        <h1 className="nickname">{player.nickname !== undefined ? player.nickname : (player.name !== undefined ? (player.name + " " + player.surname) : "")}</h1>
                    </div>
                    <div className="stats-container" style={{marginLeft: "5%"}}>
                        <div className="stat">
                            <h2 className="stat-name">{player.position !== undefined ? (player.position == "P" ? "ERA" : "BA") : ""}</h2>
                            <h2>{player.stats !== undefined ? player.stats[0] : ""}</h2>
                        </div>
                        <div className="stat">
                            <h2 className="stat-name">{player.position !== undefined ? (player.position == "P" ? "WHIP" : "HITS") : ""}</h2>
                            <h2>{player.stats !== undefined ? player.stats[1] : ""}</h2>
                        </div>
                        <div className="stat">
                            <h2 className="stat-name">{player.position !== undefined ? (player.position == "P" ? "K/9" : "HRS") : ""}</h2>
                            <h2>{player.stats !== undefined ? player.stats[2] : ""}</h2>
                        </div>
                        <div className="stat">
                            <h2 className="stat-name">{player.position !== undefined ? (player.position == "P" ? "BB/9" : "RBIs") : ""}</h2>
                            <h2>{player.stats !== undefined ? player.stats[3] : ""}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </ReactCardFlip>
    )
}

export default Card;