let firstPick;
let firstBan;
let banNum;
let bestOf;

let banCount = 0;
let pickCount = 0;


function roundSize(bans, roundsize){
    banNum = bans;
    bestOf = roundsize;
}

function banOrder(ban){
    firstBan = ban;
    if (ban == "blue") {
        $("#redFirstBanText").css("color","var(--grayPickBanTextColour)");
        $("#blueFirstBanText").css("color","var(--bluePlayerCardColour)");
    }
    else {
        $("#blueFirstBanText").css("color","var(--grayPickBanTextColour)");
        $("#redFirstBanText").css("color","var(--redPlayerCardColour)");
    }
}

function pickOrder(pick){
    firstPick = pick;
    if (pick == "blue") {
        $("#redFirstPickText").css("color","var(--grayPickBanTextColour)");
        $("#blueFirstPickText").css("color","var(--bluePlayerCardColour)");
    }
    else {
        $("#blueFirstPickText").css("color","var(--grayPickBanTextColour)");
        $("#redFirstPickText").css("color","var(--redPlayerCardColour)");
    }    
}

function generateTiles(pick, ban, banNum, bestOf) {
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

            var mapBlockText = $('<div/>', {
                class: 'map-slot-content',
            });

            $('<span/>',{
                text: '',
                id: 'mapslottext',
            }).appendTo(mapBlockText);

            mapslotBlock.append(mapBlockText);

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

            var mapBlockText = $('<div/>', {
                class: 'map-slot-content',
            });

            $('<span/>',{
                text: '',
                id: 'mapslottext',
            }).appendTo(mapBlockText);

            mapslotBlock.append(mapBlockText);

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
                style: 'opacity: 1'
            })

            $('<div/>', {
                class: 'mapCardContent tile-picking',
                text: 'PICKING'
            }).appendTo(redOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            var mapBlockText = $('<div/>', {
                class: 'map-slot-content',
            });

            $('<span/>',{
                text: '',
                id: 'mapslottext',
            }).appendTo(mapBlockText);

            mapslotBlock.append(mapBlockText);

            redOuterDiv.append(mapslotBlock);

            // Append outer div to body
            $('#redPickArea').append(redOuterDiv);

            // Blue Side 
            // Create and combine all elements before adding it to the div
            var blueOuterDiv = $('<div/>', {
                id: `bluePick${i+1}`,
                class: 'mapCard pickCardBlue',
                style: 'opacity: 1'
            })
            
            $('<div/>', {
                class: 'mapCardContent tile-picking',
                text: 'PICKING'
            }).appendTo(blueOuterDiv);

            var mapslotBlock = $('<div/>', {
                id: 'map-slot-block'
            });

            var mapBlockText = $('<div/>', {
                class: 'map-slot-content',
            });

            $('<span/>',{
                text: '',
                id: 'mapslottext',
            }).appendTo(mapBlockText);

            mapslotBlock.append(mapBlockText);

            blueOuterDiv.append(mapslotBlock);

            // Append outer div to body
            $('#bluePickArea').append(blueOuterDiv);
        }
    }

    // Placing the correct ban card first based on first ban
    if ( ban == 'blue' ){
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
            // $("#redBan1").css("opacity","0");
        }
        // If there is two bans, space the correct color ban cards apart bc of ABBA
        else if (banNum == 2){
            $("#blueBanArea").css("justify-content","space-between");
            $("#redBanArea").css("justify-content","center");
            // Hide Bans until they need to be shown
            // $("#redBan1").css("opacity","0");
            // $("#redBan2").css("opacity","0");
            // $("#blueBan2").css("opacity","0");
        }
    }
    // Do the same, but red bans first
    else if ( ban == 'red' ){
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
            // $("#blueBan1").css("opacity","0");
        }
        // If there is two bans, space the correct color ban cards apart bc of ABBA
        else if (banNum == 2){
            $("#redBanArea").css("justify-content","space-between");
            $("#blueBanArea").css("justify-content","center");
            // Hide Bans until they need to be shown
            // $("#blueBan1").css("opacity","0");
            // $("#blueBan2").css("opacity","0");
            // $("#redBan2").css("opacity","0");
        } 
    }
    // Used to even out the space left by a lower amount of picks
    if (bestOf < 13) {
        $(".pickArea").css("justify-content", "space-between");
    }
    // Placing the first pick properly in the timeline
    if (pick == "blue") { $(`.pickCardRed`).css("left","50px"); }
    else if (pick == "red") { $(`.pickCardBlue`).css("left","50px"); }
}

/*
function buttonge(){
    // Replace data in current tile
    // Check ban num
    switch (bestOf){
        case 13:
            switch (matchActionStatus) {
                case 1:
                    switch (banOrder){
                        case "blue":
                            $("#blueBan1 .mapCardContent").css({
                                "background-image": `url('./static/test-map-2.jpg')`,
                                "clip-path": 'var(--map-clip-path)',
                                "opacity": 0.4,
                            }).html("").toggleClass("tile-picking");
                            $("#blueBan1 #map-slot-block").css("opacity", "1").toggleClass("map-slot-content");
                            $("#blueBan1 #mapslottext").html("FM1");
                            break;
                        case "red":
                            break;
                        default:
                            break;
*/

function mapBan(team, map){

}

function mapPick(team, map){

}

pickOrder("red");
banOrder("blue");
roundSize(2, 13);
generateTiles(firstPick, firstBan, banNum, bestOf);
