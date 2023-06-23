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

/*
function generateTiles(banNum, bestOf) {
    var lengthTrackerRed = 10;
    var lengthTrackerBlue = 50;

    for (let i = 0; i < ((bestOf-1) / 2) + banNum; i++) {
        // Checking if a ban card needs to be made
        if (i < banNum) {
            // Red Side
            // Create outer div
            if (i == 1){

                lengthTrackerRed *= 1.6;

                var redOuterDiv = $('<div/>', {
                    id: `redBan${i}`,
                    class: 'mapCardRed',
                }).css({
                    'left': `${lengthTrackerRed}px`,
                    'background-image': "url('./static/red-ban-tile.png')"
                });
                
            }
            else {
                var redOuterDiv = $('<div/>', {
                    id: `redBan${i}`,
                    class: 'mapCardRed',
                }).css({
                    'left': `${lengthTrackerRed}px`,
                    'background-image': "url('./static/red-ban-tile.png')"
                });
            };

            $('<div/>', {
                id: 'mapCardContent',
                class: 'tile-picking',
                text: 'BANNING'
            }).appendTo(redOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            $('<div/>', {
                class: 'map-slot-content',
            }).appendTo(mapslotBlock);

            redOuterDiv.append(mapslotBlock);

            // Append outer div to body or other container
            $('#redBanArea').append(redOuterDiv);

            // Blue Side

            // Create outer div
            var blueOuterDiv = $('<div/>', {
                id: `blueBan${i}`,
                class: 'mapCardBlue',
            }).css({
                'left': `${lengthTrackerBlue}px`,
                'background-image': "url('./static/blue-ban-tile.png')"
            });

            $('<div/>', {
                id: 'mapCardContent',
                class: 'tile-picking',
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
            var redOuterDiv = $('<div/>', {
                id: `redPick${i}`,
                class: 'mapCardRed',
            }).css({
                'left': `${lengthTrackerRed}px`
            });


            $('<div/>', {
                id: 'mapCardContent',
                class: 'tile-picking',
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
            if (i == 2){
                lengthTrackerBlue *= 1.25

                var blueOuterDiv = $('<div/>', {
                    id: `bluePick${i}`,
                    class: 'mapCardBlue',
                }).css({
                    'left': `${lengthTrackerBlue}px`
                });
            }

            else {
                var blueOuterDiv = $('<div/>', {
                    id: `bluePick${i}`,
                    class: 'mapCardBlue',
                }).css({
                    'left': `${lengthTrackerBlue}px`
                });
            }
            
            $('<div/>', {
                id: 'mapCardContent',
                class: 'tile-picking',
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

        lengthTrackerRed+= 140;
        lengthTrackerBlue+= 140;
    }
}
*/

function generateTiles(firstPick, firstBan, banNum, bestOf) {
    for (let i = 0; i < ((bestOf+1) / 2) + banNum; i++) {
        // Checking if a ban card needs to be made
        if (i < banNum) {
            // Red Side
            // Create outer div
            if (i == 1){
                var redOuterDiv = $('<div/>', {
                    id: `redBan${i}`,
                    class: 'mapCard banCardRed',
                })
            }
            else {
                var redOuterDiv = $('<div/>', {
                    id: `redBan${i}`,
                    class: 'mapCard banCardRed',
                })
            };

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

            // Append outer div to body or other container
            $('#redBanArea').append(redOuterDiv);

            // Blue Side

            // Create outer div
            var blueOuterDiv = $('<div/>', {
                id: `blueBan${i}`,
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
            var redOuterDiv = $('<div/>', {
                id: `redPick${i}`,
                class: 'mapCard pickCardRed',
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
            if (i == 2){
                var blueOuterDiv = $('<div/>', {
                    id: `bluePick${i}`,
                    class: 'mapCard pickCardBlue',
                })
            }

            else {
                var blueOuterDiv = $('<div/>', {
                    id: `bluePick${i}`,
                    class: 'mapCard pickCardBlue',
                })
            }
            
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

    if ( firstBan == 'blue' ){
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
        }
        else if (banNum == 2){
            $("#blueBanArea").css("justify-content","space-between");
            $("#redBanArea").css("justify-content","center");
        }
    }

    else if ( firstBan == 'red' ){
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
        }
        else if (banNum == 2){
            $("#redBanArea").css("justify-content","space-between");
            $("#blueBanArea").css("justify-content","center");
        } 
    }

    if (firstPick == "blue") { $(`.pickCardRed`).css("left","50px"); }
    else if (firstPick == "red") { $(`.pickCardBlue`).css("left","50px"); }
}


generateTiles("blue", "red", 2, 13);
