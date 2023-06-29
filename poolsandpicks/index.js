let firstPick;
let firstBan;
let banNum;
let bestOf;

let banCount = 0;
let pickCount = 0;

const teams = {
    'redTeam': {
        'bans': [],
        'score': 0
    },
    'blueTeam': {
        'bans': [],
        'score': 0
    }
};

function setRound(round){
    switch (round) {
        case "R16":
            banNum = 1;
            bestOf = 9;
            break;
        case "QF":
            banNum = 1;
            bestOf = 9;
            break;
        case "SF":
            banNum = 2;
            bestOf = 13;
            break;
        case "F":
            banNum = 2;
            bestOf = 13;
            break;
        case "GF":
            banNum = 2;
            bestOf = 13;
            break;           
        default:
            break;
    }
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
    for (let i = 0; i < ((bestOf-1) / 2) + banNum; i++) {
        // Checking if a ban card needs to be made
        if (i < banNum) {
            // Red Side
            // Create and combine all elements before adding it to the div
            var redOuterDiv = $('<div/>', {
                id: `redBan${i}`,
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
                id: `redPick${i}`,
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
                id: `bluePick${i}`,
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
    // Lower amount of picks no longer look like complete garbage
    if (bestOf < 13) {
        // Make the pick area smaller so you can center everything
        $(".pickArea").css("width", "800px");
        if (firstBan == "blue"){
            $("#redBanArea").css("justify-content", "flex-end");
            $("#blueBanArea").css("justify-content", "flex-start");
        }
        else {
            $("#blueBanArea").css("justify-content", "flex-end");
            $("#redBanArea").css("justify-content", "flex-start");
        };
        $("#redPicksBans").css("justify-content", "center");
        $("#bluePicksBans").css("justify-content", "center");
        // Better margins for less picks
        if (pick == "blue") { $(`.pickCardRed`).css("left","65px"); }
        else if (pick == "red") { $(`.pickCardBlue`).css("left","65px"); }
    }
    else {
        $(".pickCardBlue").css("left", "0px");
        $(".pickCardRed").css("left", "0px");
        // Placing the first pick properly in the timeline
        if (pick == "blue") { $(`.pickCardRed`).css("left","55px"); }
        else if (pick == "red") { $(`.pickCardBlue`).css("left","55px"); }
    }
    
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

// TODO: Add map bg addition functionality 

function mapBan(team, map){

}

function mapPick(team, map){

}

pickOrder("red");
banOrder("blue");
setRound("F")
generateTiles(firstPick, firstBan, banNum, bestOf);
