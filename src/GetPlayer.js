async function GetPlayer({playerID}){
    let data = await (await fetch('https://statsapi.mlb.com/api/v1/people/' + playerID)).json();
    return data;
}

var player = await(GetPlayer({playerID: 660271}));
console.log(player);