window.addEventListener('contextmenu', (e) => e.preventDefault());

// START
let socket = new ReconnectingWebSocket('ws://127.0.0.1:24050/ws');

socket.onopen = async () => console.log('Successfully Connected')
socket.onclose = (event) => {
    console.log('Socket Closed Connection: ', event);
    socket.send('Client Closed!');
}
socket.onerror = (error) => console.log('Socket Error: ', error)

document.cookie = `roundName=; path=/`

let allMaps
let currentPool
const getPoolInfo = async function() {
    let poolInformationRequest = new XMLHttpRequest()
    poolInformationRequest.open("GET","https://trt2.btmc.live/api/maps/all")
    poolInformationRequest.onreadystatechange = function() {
        if (this.status == 404) return
        if (this.readyState != 4) return
        allMaps = JSON.parse(this.responseText)

        for (let i = 0; i < allMaps.length; i++) {
            allMaps[i].metadata = JSON.parse(allMaps[i].metadata)
            if (allMaps[i].mod.length == 3) allMaps[i].order = parseInt(allMaps[i].mod.charAt(2))
            allMaps[i].identifier = allMaps[i].mod
            allMaps[i].mod = allMaps[i].mod.slice(0,2).toUpperCase()
        }
        console.log(allMaps)
    }
    await poolInformationRequest.send()
}
getPoolInfo()

let firstPick = null;
let firstBan = null;
let banNum; 
let bestOf = null;
let currentRound;


const beatmaps = new Set(); // Store beatmapID;
const load_maps = async () => await $.getJSON('../_data/beatmap_data.json');

// Match scores
matchScoresRed = $("#matchScoresRed")
matchScoresBlue = $("#matchScoresBlue")

let currentBestOf
let currentMatchScoreRed
let currentMatchScoreBlue

// Player Details
let playerCardPlayerProfilePictureRed = $("#playerCardPlayerProfilePictureRed")
let playerCardPlayerNameRed = $("#playerCardPlayerNameRed")
let playerCardPlayerCountryFlagRed = $("#playerCardPlayerCountryFlagRed")
let playerCardPlayerRankRed = $("#playerCardPlayerRankRed")
let playerCardPlayerProfilePictureBlue = $("#playerCardPlayerProfilePictureBlue")
let playerCardPlayerNameBlue = $("#playerCardPlayerNameBlue")
let playerCardPlayerCountryFlagBlue = $("#playerCardPlayerCountryFlagBlue")
let playerCardPlayerRankBlue = $("#playerCardPlayerRankBlue")
let currentPlayerRedID
let currentPlayerRedName
let currentPlayerRedCountry
let currentPlayerRedRank
let currentPlayerBlueID
let currentPlayerBlueName
let currentPlayerBlueCountry
let currentPlayerBlueRank

function displayPlayerFlag(country, element) {
    switch (country) {
        case "Australia": element.attr("src","static/flags/AU.png"); break;
        case "Canada": element.attr("src","static/flags/CA.png"); break;
        case "China": element.attr("src","static/flags/CN.png"); break;
        case "Hong Kong": element.attr("src","static/flags/HK.png"); break;
        case "South Korea": element.attr("src","static/flags/KR.png"); break;
        case "Poland": element.attr("src","static/flags/PL.png"); break;
        case "United Kingdom": element.attr("src","static/flags/UK.png"); break;
        case "Great Britain": element.attr("src","static/flags/UK.png"); break;
        case "United States": element.attr("src","static/flags/US.png"); break;
        default: element.attr("src","static/flags/blank.png"); break;
    }
}

let starVisibility;
let currentPicker;

// Team Name
let redName = 'Red Team', blueName = 'Blue Team';


socket.onmessage = event => {
    let data = JSON.parse(event.data)
    console.log(data)
    // Team Name Update
    if (redName != data.tourney.manager.teamName.left) redName = data.tourney.manager.teamName.left
    if (blueName != data.tourney.manager.teamName.right) blueName = data.tourney.manager.teamName.right
    // Player Details Update
    // Profile Picture
    if (currentPlayerRedID != data.tourney.ipcClients[0].spectating.userID) {
        currentPlayerRedID = data.tourney.ipcClients[0].spectating.userID
        playerCardPlayerProfilePictureRed.attr("src",`https://a.ppy.sh/${currentPlayerRedID}`)
        if (currentPlayerRedID == 0) playerCardPlayerProfilePictureRed.css("display", "none")
        else playerCardPlayerProfilePictureRed.css("display", "block")
    }
    if (currentPlayerBlueID != data.tourney.ipcClients[1].spectating.userID) {
        currentPlayerBlueID = data.tourney.ipcClients[1].spectating.userID
        playerCardPlayerProfilePictureBlue.attr("src",`https://a.ppy.sh/${currentPlayerBlueID}`)
        if (currentPlayerBlueID == 0) playerCardPlayerProfilePictureBlue.css("display", "none")
        else playerCardPlayerProfilePictureBlue.css("display", "block")
    }
    // Player Name
    if (currentPlayerRedName != data.tourney.ipcClients[0].spectating.name) {
        currentPlayerRedName = data.tourney.ipcClients[0].spectating.name
        playerCardPlayerNameRed.text(currentPlayerRedName)
    }
    if (currentPlayerBlueName != data.tourney.ipcClients[1].spectating.name) {
        currentPlayerBlueName = data.tourney.ipcClients[1].spectating.name
        playerCardPlayerNameBlue.text(currentPlayerBlueName)
    }
    // Player Flag
    if (currentPlayerRedCountry != data.tourney.ipcClients[0].spectating.country) {
        currentPlayerRedCountry = data.tourney.ipcClients[0].spectating.country
        displayPlayerFlag(currentPlayerRedCountry, playerCardPlayerCountryFlagRed)
    }
    if (currentPlayerBlueCountry != data.tourney.ipcClients[1].spectating.country) {
        currentPlayerBlueCountry = data.tourney.ipcClients[1].spectating.country
        displayPlayerFlag(currentPlayerBlueCountry, playerCardPlayerCountryFlagBlue)
    }
    // Player Rank
    if (currentPlayerRedRank != data.tourney.ipcClients[0].spectating.globalRank) {
        currentPlayerRedRank = data.tourney.ipcClients[0].spectating.globalRank
        playerCardPlayerRankRed.text(`#${currentPlayerRedRank}`)
    }
    if (currentPlayerBlueRank != data.tourney.ipcClients[1].spectating.globalRank) {
        currentPlayerBlueRank = data.tourney.ipcClients[1].spectating.globalRank
        playerCardPlayerRankBlue.text(`#${currentPlayerBlueRank}`)
    }

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
    if (tempMapID !== data.menu.bm.id && data.menu.bm.id != 0) {
        if (tempMapID == 0) tempMapID = data.menu.bm.id;
        else {
            tempMapID = data.menu.bm.id;
            let pickedMap = Array.from(beatmaps).find(b => b.beatmapID == tempMapID);
            if (pickedMap && enableAutoPick && !selectedMaps.includes(tempMapID)) pickMap(Array.from(beatmaps).find(b => b.beatmapID == tempMapID),currentPicker == 'Red' ? redName : blueName, currentPicker);
    }
}
}

let user = {};

let tempMapID, tempImg, tempMapArtist, tempMapTitle, tempMapDiff, tempMapper;

let tempSR, tempCS, tempAR, tempOD, tempHP;

let gameState;

let hasSetup = false;

let banCount = 0;
let pickCount = 0;

const mods = {
    NM: 0,
    HD: 1,
    HR: 2,
    DT: 3,
    FM: 4,
    TB: 5,
};

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

window.setInterval(() => {
    let cookieName = "roundName"
    let match = document.cookie.match(`(?:^|.*)${cookieName}=(.+?)(?:$|[|;].*)`)
    if (match && currentRound != match[1]) setRound(match[1])
}, 500)

function removeTiles() {
    $(".mapCard").remove();
}

function setRound(round){
    switch (round) {
        case "RO16": case "QF": case "SF":
            banNum = 1;
            bestOf = 9;
            $("#controlPanel .buttonBox #ctrlRoundText").html(`Select round: ${round}`);
            break;
        case "F": case "GF": case "BR1":
            banNum = 2;
            bestOf = 13;
            $("#controlPanel .buttonBox #ctrlRoundText").html(`Select round: ${round}`);
            break;
        default:
            break;
    }

    if (currentRound != round) currentRound = round
    document.cookie = `roundName=${round}; path=/`

    currentPool = allMaps.filter(map => map.round == round)
    let NMPool = currentPool.filter(map => map.mod == "NM")
    let HDPool = currentPool.filter(map => map.mod == "HD")
    let HRPool = currentPool.filter(map => map.mod == "HR")
    let DTPool = currentPool.filter(map => map.mod == "DT")
    let TBPool = currentPool.filter(map => map.mod == "TB")

    NMPool.sort((mapA, mapB) => mapA.order - mapB.order)
    HDPool.sort((mapA, mapB) => mapA.order - mapB.order)
    HRPool.sort((mapA, mapB) => mapA.order - mapB.order)
    DTPool.sort((mapA, mapB) => mapA.order - mapB.order)
    TBPool.sort((mapA, mapB) => mapA.order - mapB.order)
    let currentPoolTemp = [NMPool, HDPool, HRPool, DTPool, TBPool]
    currentPool = []
    
    for (let i = 0; i < currentPoolTemp.length; i++) {
        for (let j = 0; j < currentPoolTemp[i].length; j++) {
            currentPool.push(currentPoolTemp[i][j])
        }
    }
    setupBeatmaps()
}

function banOrder(ban){
    firstBan = ban;
    if (ban == "blue") {
        $("#redFirstBanText").css("color","var(--grayPickBanTextColour)");
        $("#blueFirstBanText").css("color","var(--bluePlayerCardColour)");
        $("#controlPanel .buttonBox #ctrlBanText").html(`Select 1st Ban: ${ban}`);
        return;
    }

    $("#blueFirstBanText").css("color","var(--grayPickBanTextColour)");
    $("#redFirstBanText").css("color","var(--redPlayerCardColour)");
    $("#controlPanel .buttonBox #ctrlBanText").html(`Select 1st Ban: ${ban}`);
}

function pickOrder(pick){
    firstPick = pick;
    if (pick == "blue") {
        $("#redFirstPickText").css("color","var(--grayPickBanTextColour)");
        $("#blueFirstPickText").css("color","var(--bluePlayerCardColour)");

        $("#controlPanel .buttonBox #ctrlPickText").html(`Select 1st Pick: ${pick}`);
        return;
    } 
    $("#blueFirstPickText").css("color","var(--grayPickBanTextColour)");
    $("#redFirstPickText").css("color","var(--redPlayerCardColour)");

    $("#controlPanel .buttonBox #ctrlPickText").html(`Select 1st Pick: ${pick}`)

}

function generateTiles() {
    if (firstPick == null || firstBan == null || bestOf == null) {
        $("#ctrlGentileText").html("Generate Tiles: Missing Selection");
        return;
    }
    $(".mapCard").remove();
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
                style: 'opacity: 0'
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
            $("#redBan0").css("opacity","0");
        }
        // If there is two bans, space the correct color ban cards apart bc of ABBA
        else if (banNum == 2){
            $("#blueBanArea").css("justify-content","space-between");
            $("#redBanArea").css("justify-content","center");
            // Hide Bans until they need to be shown
            $("#redBan0").css("opacity","0");
            $("#redBan1").css("opacity","0");
            $("#blueBan1").css("opacity","0");
        }
    }
    // Do the same, but red bans first
    else {
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
            $("#blueBan0").css("opacity","0");
        }
        // If there is two bans, space the correct color ban cards apart bc of ABBA
        else if (banNum == 2){
            $(".banArea").css("width","var(--two-bans-width)");
            $("#redBanArea").css("justify-content","space-between");
            $("#blueBanArea").css("justify-content","center");
            // Hide Bans until they need to be shown
            $("#blueBan0").css("opacity","0");
            $("#blueBan1").css("opacity","0");
            $("#redBan1").css("opacity","0");
        } 
    }
    // Lower amount of picks so it doesnt look like complete garbage
    if (bestOf < 13) {
        // Make the pick area smaller so you can center everything
        $(".pickArea").css("width", "800px");
        if (firstBan == "blue"){
            $("#redBanArea").css("justify-content", "center");
            $("#blueBanArea").css("justify-content", "flex-start");
        }
        else {
            $("#blueBanArea").css("justify-content", "center");
            $("#redBanArea").css("justify-content", "flex-start");
        };
        $("#redPicksBans").css("justify-content", "center");
        $("#bluePicksBans").css("justify-content", "center");
        // Better margins for less picks
        if (firstPick == "blue") { $(`.pickCardRed`).css("left","65px"); }
        else if (firstPick == "red") { $(`.pickCardBlue`).css("left","65px"); }
        // Change TB position
        $("#tiebreakerCard").css("right", "120px");
        // Adjust line as well
        $(".whiteLine").css("width", "1700px");
    }
    else {
        $(".whiteLine").css("width","1700px");
        $("#tiebreakerCard").css("right","40px");
        $(".pickArea").css("width","1000px");
        $(".pickCardBlue").css({
            "left":"0px",
            "opacity": 0
        });
        $(".pickCardRed").css({
            "left":"0px",
            "opacity": 0
        });
        $(".banArea").css("width", "var(--two-bans-width)");
        // Placing the first pick properly in the timeline
        if (firstPick == "blue") { $(`.pickCardRed`).css("left","55px"); }
        else if (firstPick == "red") { $(`.pickCardBlue`).css("left","55px"); }
    }
    $("#ctrlGentileText").html("Generate Tiles: DONE");
    $("#ctrlRemtileText").html("Remove Tiles:");
}

// TODO: Add map bg addition functionality 
// TODO: 

class Beatmap {
    constructor(mods, beatmapID, layerName, identifier) {
        this.mods = mods;
        this.beatmapID = beatmapID;
        this.layerName = layerName;
        this.identifier = identifier
    }
    generate() {
        let mappoolContainer = document.getElementById(`${this.mods}`);

        // Clicker
        this.clicker = document.createElement('div');
        this.clicker.id = `${this.layerName}Clicker`;
        this.clicker.setAttribute('class', 'clicker');

        
        // Border
        this.border = document.createElement("div")
        this.border.classList.add(`icon-${this.mods.toLowerCase()}`)
        this.border.classList.add("mapBorder")
        // Black Background
        this.background = document.createElement("div")
        this.background.classList.add("mapBackground")
        // Overlay
        this.backgroundOverlay = document.createElement("div")
        this.backgroundOverlay.classList.add("mapBackgroundOverlay")
        // Mod ID
        this.modID = document.createElement("div")
        this.modID.innerText = this.identifier
        this.modID.classList.add(`icon-${this.mods.toLowerCase()}`)
        this.modID.classList.add("mapModID")
        // Map Text List
        this.mapTextList = document.createElement("div")
        this.mapTextList.classList.add("mapTextList")
        // Map Text Container
        this.mapTextContainer = document.createElement("div")
        this.mapTextContainer.classList.add("mapTextContainer")
        // Map Artist
        this.artist = document.createElement("div")
        this.artist.innerText = "COLDPLAY"
        this.artist.classList.add("mapTextArtist")
        // Map Song and Diff
        this.songAndDiff = document.createElement("div")
        this.songAndDiff.classList.add("mapSongAndDiff")
        // Map Title
        this.title = document.createElement("span")
        // Map Difficulty
        this.difficulty = document.createElement("span")
        // Map Mapper Container
        this.mapperContainer = document.createElement("div")
        this.mapperContainer.classList.add("mapMapperContainer")
        // Map Mapper Text
        this.mapperText = document.createElement("div")
        this.mapperText.innerText = "MAPPER"
        this.mapperText.classList.add("mapMapperText")
        // Map Mapper
        this.mapper = document.createElement("div")
        this.mapper.classList.add("mapMapper")
        // Blink Overlay
        this.blinkoverlay = document.createElement('div');
        this.blinkoverlay.classList.add("blinkoverlay")
        // Picked Status
        this.pickedStatus = document.createElement('div');
        this.pickedStatus.classList.add("pickingStatus")
        // Append Everything
        mappoolContainer.appendChild(this.clicker);
        this.clicker.appendChild(this.border)
        this.border.appendChild(this.background)
        this.border.appendChild(this.backgroundOverlay)
        this.border.appendChild(this.modID)
        this.border.appendChild(this.mapTextList)
        this.mapTextList.appendChild(this.mapTextContainer)
        this.mapTextContainer.appendChild(this.artist)
        this.mapTextContainer.appendChild(this.songAndDiff)
        this.songAndDiff.appendChild(this.title)
        this.songAndDiff.innerHTML += " ["
        this.songAndDiff.appendChild(this.difficulty)
        this.songAndDiff.innerHTML += "]"
        this.mapTextList.appendChild(this.mapperContainer)
        this.mapperContainer.appendChild(this.mapperText)
        this.mapperContainer.appendChild(this.mapper)
        this.clicker.appendChild(this.blinkoverlay)
        this.clicker.appendChild(this.pickedStatus)
    }
    grayedOut() {
        this.overlay.style.opacity = '1';
    }
}

async function setupBeatmaps() {
    let mapContainer = document.getElementsByClassName("mapContainer")
    for (let i = 0; i < mapContainer.length; i++) {
        mapContainer[i].innerHTML = ""
    }
    hasSetup = true;
    let lastPicked = null;

    const modsCount = {
        NM: 0,
        HD: 0,
        HR: 0,
        DT: 0,
        FM: 0,
        TB: 0,
    };

    let bms = currentPool;

    function countMods() {
        currentPool.map((beatmap) => {
            modsCount[beatmap.mod]++;
        });
    };
    countMods()
    console.log(modsCount)

    let row = -1;
    let preMod = 0;
    let colIndex = 0;

    function setPickedMap(bm, event) {
        if (lastPicked !== null) {
            lastPicked.blinkoverlay.style.animation = 'none';
        }
        lastPicked = bm;
        bm.pickedStatus.style.color = '#f5f5f5';
        bm.blinkoverlay.style.animation = event.ctrlKey
            ? 'none'
            : 'blinker 1s cubic-bezier(.36,.06,.01,.57) 300ms 8, slowPulse 5000ms ease-in-out 8000ms 18'; // 36 * 5s -> 180s of slow pulse (+8s), enough to run down 120s countdown but short enough to reset before next time mappool is shown
        bm.artist.style.opacity = '0.3';
        bm.songAndDiff.style.opacity = '0.3';
        bm.modID.style.opacity = '0.3';
        bm.mapper.style.opacity = '0.3';
        bm.mapperText.style.opacity = '0.3';
        bm.backgroundOverlay.style.backgroundColor = "rgba(0,0,0,0.8)"
    }

    function resetMapPick(bm) {
        bm.backgroundOverlay.style.backgroundColor = "rgba(0,0,0,0.5)"
        bm.blinkoverlay.style.animation = 'none';
        bm.artist.style.opacity = '1';
        bm.songAndDiff.style.opacity = '1';
        bm.modID.style.opacity = '1';
        bm.mapper.style.opacity = '1';
        bm.mapperText.style.opacity = '1';
        bm.pickedStatus.style.opacity = '0';
        bm.pickedStatus.style.boxShadow = 'none';
    }

    bms.map(async (beatmap, index) => {
        if (beatmap.mod !== preMod || colIndex % 3 === 0) {
            preMod = beatmap.mod;
            colIndex = 0;
            row++;
        }
        const bm = new Beatmap(beatmap.mod, beatmap.beatmap_id, `map${index}`, beatmap.identifier);
        bm.generate();
        bm.clicker.addEventListener('mousedown', function () {
            bm.clicker.addEventListener('click', function (event) {
                if (!event.shiftKey) {
                    setPickedMap(bm, event);
                    document.cookie = `lastPick=red;path=/`;
                    setTimeout(function () {
                        bm.pickedStatus.style.opacity = '1';
                        bm.pickedStatus.innerHTML = bm.mods.includes("TB") ? "Tiebreaker" : event.ctrlKey ? `<b class="pickRed">${redName}</b> ban` : `<b class="pickRed">${redName}</b> pick`;
                    }, 300);
                } else {
                    resetMapPick(bm);
                    document.cookie = `lastPick=;path=/`;
                    setTimeout(function () {
                        bm.pickedStatus.style.opacity = '1';
                        bm.pickedStatus.innerHTML = '';
                    }, 300);
                }
            });
            bm.clicker.addEventListener('contextmenu', function (event) {
                if (!event.shiftKey) {
                    setPickedMap(bm, event);
                    document.cookie = `lastPick=blue;path=/`;
                    setTimeout(function () {
                        bm.pickedStatus.style.opacity = '1';
                        bm.pickedStatus.innerHTML = bm.mods.includes("TB") ? "Tiebreaker" : event.ctrlKey ? `<b class="pickBlue">${blueName}</b> ban` : `<b class="pickBlue">${blueName}</b> pick`;
                    }, 150);
                } else {
                    resetMapPick(bm);
                    document.cookie = `lastPick=;path=/`;
                    setTimeout(function () {
                        bm.pickedStatus.style.opacity = '1';
                        bm.pickedStatus.innerHTML = '';
                    }, 150);
                }
            });
        });
        const stored_beatmaps = bms
        const mapData = await getDataSet(stored_beatmaps, beatmap.osuMapId);
        console.log(`https://assets.ppy.sh/beatmaps/${mapData.metadata.beatmapset_id}/covers/cover.jpg`)
        bm.background.style.backgroundImage = `url('https://assets.ppy.sh/beatmaps/${mapData.metadata.beatmapset_id}/covers/cover.jpg')`;
        bm.songAndDiff.innerText = `${mapData.metadata.title} [${mapData.metadata.version}]`
        bm.artist.innerText = mapData.metadata.artist
        bm.mapper.innerText = mapData.metadata.creator
        beatmaps.add(bm);
    });
}

function getDataSet(stored_beatmaps, beatmap_id) {
    let beatmap = stored_beatmaps.find(b => b.osuMapId == beatmap_id);
    return beatmap || null;
};

function banOrder(ban){
    firstBan = ban;
    if (ban == "blue") {
        $("#redFirstBanText").css("color","var(--grayPickBanTextColour)");
        $("#blueFirstBanText").css("color","var(--bluePlayerCardColour)");
        $("#controlPanel .buttonBox #ctrlBanText").html(`Select 1st Ban: ${ban}`);
        return;
    }

    $("#blueFirstBanText").css("color","var(--grayPickBanTextColour)");
    $("#redFirstBanText").css("color","var(--redPlayerCardColour)");
    $("#controlPanel .buttonBox #ctrlBanText").html(`Select 1st Ban: ${ban}`);
}

function pickOrder(pick){
    firstPick = pick;
    if (pick == "blue") {
        $("#redFirstPickText").css("color","var(--grayPickBanTextColour)");
        $("#blueFirstPickText").css("color","var(--bluePlayerCardColour)");

        $("#controlPanel .buttonBox #ctrlPickText").html(`Select 1st Pick: ${pick}`);
        return;
    } 
    $("#blueFirstPickText").css("color","var(--grayPickBanTextColour)");
    $("#redFirstPickText").css("color","var(--redPlayerCardColour)");

    $("#controlPanel .buttonBox #ctrlPickText").html(`Select 1st Pick: ${pick}`)
}

function removeTiles() {
    $(".mapCard").remove();

    $("#ctrlRemtileText").html("Remove Tiles: Removed!");
    $("#ctrlGentileText").html("Generate Tiles:");
}

function viewMappool () {
    $("#pickBans").animate({
        opacity: '0',
        left: '-1920px'
    }, 1000, 'easeInOutQuart');
    $("#mappoolDisplay").animate({
        right: '40px',
        opacity: '1'
    }, 1000, 'easeInOutQuart'); 
}

function viewPicks () {
    $("#mappoolDisplay").animate({
        right: '-1340px',
        opacity: '0'
    }, 1000, 'easeInOutQuart');

    $("#pickBans").animate({
        left: '0px',
        opacity: '1'
    }, 1000, 'easeInOutQuart');
    // $("#pickBans").animate({
    //     opacity: '1'
    // }, 500, 'easeInOutQuart');

}

function tileAdd(color, action, identifier, mapID, mapSlot){
    $(`#${color}${action}${identifier} .mapCardContent`).html("").toggleClass("tile-picking").css({
        "background-image": `url(https://assets.ppy.sh/beatmaps/${mapID}/covers/cover.jpg)`,
        "clip-path": "var(--map-clip-path)",
        "opacity": 0.4
    });
    $(`#${color}${action}${identifier} #map-slot-block`).css({
        "opacity": 1,
        "background-color": `var(--${color})`
    });
    $(`#${color}${action}${identifier} #map-slot-block #mapslottext`).html(`${mapSlot}`);
}

function tileRemove(color, action, identifier){
    $(`#${color}${action}${identifier} .mapCardContent`).html("").toggleClass("tile-picking").css({
        "background-image": ``,
        "clip-path": "",
        "opacity": 1
    });
    $(`#${color}Ban${identifier} #map-slot-block`).css({
        "opacity": 0,
        "background-color": `var(--${color})`
    });
    $(`#${color}${action}${identifier} #map-slot-block #mapslottext`).html('');
}


setupBeatmaps();
