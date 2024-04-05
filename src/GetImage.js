async function GetImage(){
    const url = 'https://remove-background-image2.p.rapidapi.com/remove-background?image_url=https%3A%2F%2Fimg.mlbstatic.com%2Fmlb-photos%2Fimage%2Fupload%2Fd_people%3Ageneric%3Aaction%3Ahero%3Acurrent.jpg%2Fq_auto%3Agood%2Cw_1500%2Fv1%2Fpeople%2F606192%2Faction%2Fhero%2Fcurrent';
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
            console.log(playerImage);
        }
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

GetImage();