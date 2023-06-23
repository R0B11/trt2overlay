// Connecting to server
let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws")
socket.onopen = () => console.log("Successfully Connected")
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
    socket.send("Client Closed!")
};
socket.onerror = error => console.log("Socket Error: ", error)

// Match scores
matchScoresRed = $("#matchScoresRed")
matchScoresBlue = $("#matchScoresBlue")
let currentBestOf
let currentMatchScoreRed
let currentMatchScoreBlue
let starVisibility

socket.onmessage = event => {
    let data = JSON.parse(event.data)
    console.log(data)

    // Star Generation
    if (currentBestOf != Math.ceil(data.tourney.manager.bestOF / 2) ||
        currentMatchScoreRed != data.tourney.manager.stars.left ||
        currentMatchScoreBlue != data.tourney.manager.stars.right) {
            
        currentBestOf = Math.ceil(data.tourney.manager.bestOF / 2)
        currentMatchScoreRed = data.tourney.manager.stars.left
        currentMatchScoreBlue = data.tourney.manager.stars.right
        matchScoresRed.html("")
        matchScoresBlue.html("")
        // Left Stars
        let i = 0
        for (i; i < currentMatchScoreRed; i++) {
            let imgStar = document.createElement("img")
            imgStar.classList.add("matchScoreSword")
            imgStar.setAttribute("src", "static/whiteStar.png")
            matchScoresRed.append(imgStar)
        }
        for (i; i < currentBestOf; i++) {
            let imgStar = document.createElement("img")
            imgStar.classList.add("matchScoreSword")
            imgStar.setAttribute("src", "static/redStar.png")
            matchScoresRed.append(imgStar)
        }
        // Right Stars
        i = 0;
        for (i; i < currentMatchScoreBlue; i++) {
            let imgStar = document.createElement("img")
            imgStar.classList.add("matchScoreSword")
            imgStar.setAttribute("src", "static/whiteStar.png")
            matchScoresBlue.append(imgStar)
        }
        for (i; i < currentBestOf; i++) {
            let imgStar = document.createElement("img")
            imgStar.classList.add("matchScoreSword")
            imgStar.setAttribute("src", "static/blueStar.png")
            matchScoresBlue.append(imgStar)
        }
    }
}

let pickOrder = "blue";
let banOrder = "red"
let banNum = 2;
let bestOf = 13;

function generateTiles(firstPick, firstBan, banNum, bestOf) {
    for (let i = 0; i < ((bestOf+1) / 2) + banNum; i++) {
        // Checking if a ban card needs to be made
        if (i < banNum) {
            // Red Side
            // Create and combine all elements before adding it to the div
            var redOuterDiv = $('<div/>', {
                id: `redBan${i+1}`,
                class: 'mapCard banCardRed',
            })

            $('<div/>', {
                class: 'mapCardContent tile-picking',
                text: 'BANNING'
            }).appendTo(redOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            $('<div/>', {
                class: 'map-slot-content',
            }).appendTo(mapslotBlock);

            redOuterDiv.append(mapslotBlock);

            // Append outer div to body
            $('#redBanArea').append(redOuterDiv);

            // Blue Side
            // Create and combine all elements before adding it to the div
            var blueOuterDiv = $('<div/>', {
                id: `blueBan${i+1}`,
                class: 'mapCard banCardBlue',
            })
            $('<div/>', {
                class: 'mapCardContent tile-picking',
                text: 'BANNING'
            }).appendTo(blueOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            $('<div/>', {
                class: 'map-slot-content',
            }).appendTo(mapslotBlock);

            blueOuterDiv.append(mapslotBlock);

            // Append outer div to body
            $('#blueBanArea').append(blueOuterDiv);
        }
        // If a ban card does not need to be made anymore, pick cards will be generated
        else {
            // Red Side
            // Create and combine all elements before adding it to the div
            var redOuterDiv = $('<div/>', {
                id: `redPick${i+1}`,
                class: 'mapCard pickCardRed',
                style: 'opacity: 0'
            })

            $('<div/>', {
                class: 'mapCardContent tile-picking',
                text: 'PICKING'
            }).appendTo(redOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            $('<div/>', {
                class: 'map-slot-content',
            }).appendTo(mapslotBlock);

            redOuterDiv.append(mapslotBlock);

            // Append outer div to body
            $('#redPickArea').append(redOuterDiv);

            // Blue Side 
            // Create and combine all elements before adding it to the div
            var blueOuterDiv = $('<div/>', {
                id: `bluePick${i+1}`,
                class: 'mapCard pickCardBlue',
                style: 'opacity: 0'
            })
            
            $('<div/>', {
                class: 'mapCardContent tile-picking',
                text: 'PICKING'
            }).appendTo(blueOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            $('<div/>', {
                class: 'map-slot-content',
            }).appendTo(mapslotBlock);

            blueOuterDiv.append(mapslotBlock);

            // Append outer div to body
            $('#bluePickArea').append(blueOuterDiv);
        }
    }

    // Placing the correct ban card first based on first ban
    if ( firstBan == 'blue' ){
        // If there is only one ban, make the ban box smaller and center the ban tiles
        if (banNum == 1) {
            $("#blueBanArea").css({
                "width": "175px",
                "justify-content": "center"
            });
            $("#redBanArea").css({
                "width": "175px",
                "justify-content": "center"
            });
            $(".banCardRed").css("left","40px");
            // Hide Bans until they need to be shown
            $("#redBan1").css("opacity","0");
        }
        // If there is two bans, space the correct color ban cards apart bc of ABBA
        else if (banNum == 2){
            $("#blueBanArea").css("justify-content","space-between");
            $("#redBanArea").css("justify-content","center");
            // Hide Bans until they need to be shown
            $("#redBan1").css("opacity","0");
            $("#redBan2").css("opacity","0");
            $("#blueBan2").css("opacity","0");
        }
    }
    // Do the same, but red bans first
    else if ( firstBan == 'red' ){
        // If there is only one ban, make the ban box smaller and center the ban tiles
        if (banNum == 1) {  
            $("#blueBanArea").css({
                "width": "175px",
                "justify-content": "center"
            });
            $("#redBanArea").css({
                "width": "175px",
                "justify-content": "center"
            });
            $(".banCardBlue").css("left","40px");
            // Hide Bans until they need to be shown
            $("#blueBan1").css("opacity","0");
        }
        // If there is two bans, space the correct color ban cards apart bc of ABBA
        else if (banNum == 2){
            $("#redBanArea").css("justify-content","space-between");
            $("#blueBanArea").css("justify-content","center");
            // Hide Bans until they need to be shown
            $("#blueBan1").css("opacity","0");
            $("#blueBan2").css("opacity","0");
            $("#redBan2").css("opacity","0");
        } 
    }
    // Used to even out the space left by a lower amount of picks
    if (bestOf < 13) {
        $(".pickArea").css("justify-content", "space-between");
    }
    // Placing the first pick properly in the timeline
    if (firstPick == "blue") { $(`.pickCardRed`).css("left","50px"); }
    else if (firstPick == "red") { $(`.pickCardBlue`).css("left","50px"); }
}

let matchActionStatus = 1;

function buttonge(){
    // Replace data in current tile
    // Check ban num
    if (bestOf == 13){
        switch (matchActionStatus) {
            case 1:
                
                break;
            case 2:
                
                break;
            case 3:
                
                break;
            case 4:
                
                break;
            case 5:
                
                break;
            case 6:
                
                break;
            case 7:
                
                break;
            case 8:
                
                break;
            case 9:
                
                break;    
            default:
                break;
        }
    }
    else if (bestOf == 11) {
        switch (matchActionStatus) {
            case 1:
                
                break;
            case 2:
                
                break;
            case 3:
                
                break;
            case 4:
                
                break;
            case 5:
                
                break;
            case 6:
                
                break;
            case 7:
                
                break;   
            default:
                break;
        }
    }
    else {
        switch (matchActionStatus) {
            case 1:
                
                break;
            case 2:
                
                break;
            case 3:
                
                break;
            case 4:
                
                break;
            case 5:
                
                break;
            case 6:
                
                break; 
            default:
                break;
        }
    };
    
}

generateTiles(pickOrder, banOrder, banNum, bestOf);
