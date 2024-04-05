import {useEffect, useState} from 'react';
import './Card.css'

function Card({playerID}){
    const [player, setPlayer] = useState("");
    const [image, setImage] = useState("");
    useEffect(() => {
        async function fetchData(){
            var data = (await GetPlayer({playerID: playerID}));
            console.log(data.people[0].id);
            var newPlayer = await(arrangeData(data));
            setPlayer(newPlayer);
            /*var playerImage = await(getImage(playerID));
            console.log(playerImage);
            setImage(playerImage);*/
        }
        fetchData();
    }, [playerID]);

    async function GetPlayer({playerID}){
        let data = await (await fetch('https://statsapi.mlb.com/api/v1/people/' + playerID)).json();
        return data;
    }

    async function arrangeData(data){
        var id = data.people[0].id;
        var name = data.people[0].firstName;
        var surname = data.people[0].lastName;
        var position = data.people[0].primaryPosition.abbreviation;
        var hand = data.people[0].batSide.code;
        var stats = data.people[0].stats;
        var newPlayer = new Player(id, name, surname, position, 0, hand, stats);
        console.log(newPlayer);
        return newPlayer;
    }

    async function getImage(playerID){
        const url = 'https://remove-background-image2.p.rapidapi.com/remove-background?image_url=' + 'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:action:hero:current.jpg/q_auto:good,w_1500/v1/people/'+ playerID  +'/action/hero/current';
        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': 'e5b9beac94msh8e8d81d294c1d1bp1454a4jsnc9546e06274c',
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

    class Player {
        constructor(id, name, surname, position, teamID, hand, stats) {
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.position = position;
            this.teamID = teamID;
            this.hand = hand;
            this.stats = stats;
        }
    }

    return(
        <div className="card-container">
            <div className="card">
                <div className="player-name-container">
                    <div className="player-name">
                        <h1>{player.name}</h1>
                        <h1>{player.surname}</h1>
                    </div>
                </div>
                <div className="logo-container">
                    <img className="logo" src="https://www.mlbstatic.com/team-logos/team-cap-on-light/119.svg" alt="" />
                </div>
                <div className="position">
                    <img src="field.png" alt="" />
                    <div style = {{width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <h2 style={{margin: "0", marginBottom: "1vh"}}>{player.position}</h2>
                    </div>
                </div>
                <div className="card-image-container">
                        {//<img className="card-image" src={image}/>
                        }
                        <img className="card-image" src="glasnow-test.png" alt="" />
                    </div>
            </div>
        </div>
    )
}

export default Card;