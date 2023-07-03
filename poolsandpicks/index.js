window.addEventListener('contextmenu', (e) => e.preventDefault());

// START
let socket = new ReconnectingWebSocket('ws://127.0.0.1:24050/ws');
let user = {};

// // NOW PLAYING
// let mapContainer = document.getElementById('mapContainer');
// let mapArtist = document.getElementById('mapName');
// let mapInfo = document.getElementById('mapInfo');
// let mapper = document.getElementById('mapper');
// let stars = document.getElementById('stars');
// let stats = document.getElementById('stats');

const beatmaps = new Set(); // Store beatmapID;
const load_maps = async () => await $.getJSON('../_data/beatmap_data.json');

let tempMapID, tempImg, tempMapArtist, tempMapTitle, tempMapDiff, tempMapper;

let tempSR, tempCS, tempAR, tempOD, tempHP;

let gameState;

let hasSetup = false;

let redName = 'Red Team', blueName = 'Blue Team';

let firstPick;
let firstBan;
let banNum;
let bestOf;

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

socket.onopen = async () => {
    console.log('Successfully Connected');
};

socket.onclose = (event) => {
    console.log('Socket Closed Connection: ', event);
    socket.send('Client Closed!');
};

socket.onerror = (error) => {
    console.log('Socket Error: ', error);
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
        return;
    }

    $("#blueFirstBanText").css("color","var(--grayPickBanTextColour)");
    $("#redFirstBanText").css("color","var(--redPlayerCardColour)");
}

function pickOrder(pick){
    firstPick = pick;
    if (pick == "blue") {
        $("#redFirstPickText").css("color","var(--grayPickBanTextColour)");
        $("#blueFirstPickText").css("color","var(--bluePlayerCardColour)");
        return;
    } 
    $("#blueFirstPickText").css("color","var(--grayPickBanTextColour)");
    $("#redFirstPickText").css("color","var(--redPlayerCardColour)");
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
        if (pick == "blue") { $(`.pickCardRed`).css("left","65px"); }
        else if (pick == "red") { $(`.pickCardBlue`).css("left","65px"); }
        // Change TB position
        $("#tiebreakerCard").css("right", "120px");
        // Adjust line as well
        $(".whiteLine").css("width", "1700px");
    }
    else {
        $(".pickCardBlue").css("left", "0px");
        $(".pickCardRed").css("left", "0px");
        // Placing the first pick properly in the timeline
        if (pick == "blue") { $(`.pickCardRed`).css("left","55px"); }
        else if (pick == "red") { $(`.pickCardBlue`).css("left","55px"); }
    }
    
}

// TODO: Add map bg addition functionality 
// TODO: 
function mapBan(){
    $("#redBan0 .mapCardContent").html("").toggleClass("tile-picking").css({
        "background-image": "url(./static/test-map.png)",
        "clip-path": "var(--map-clip-path)",
        "opacity": 0.4
    });
    $("#redBan0 #map-slot-block").css({
        "opacity": 1,
        "background-color": "var(--red)"
    });
    $("#redBan0 #map-slot-block #mapslottext").html("HR1");
}

function mapPick(){

}

class Beatmap {
    constructor(mods, beatmapID, layerName) {
        this.mods = mods;
        this.beatmapID = beatmapID;
        this.layerName = layerName;
    }
    generate() {
        let mappoolContainer = document.getElementById(`${this.mods}`);

        this.clicker = document.createElement('div');
        this.clicker.id = `${this.layerName}Clicker`;

        mappoolContainer.appendChild(this.clicker);
        let clickerObj = document.getElementById(this.clicker.id);

        this.bg = document.createElement('div');
        this.map = document.createElement('div');
        this.overlay = document.createElement('div');
        this.blinkoverlay = document.createElement('div');
        this.artist = document.createElement('div');
        this.title = document.createElement('div');
        this.difficulty = document.createElement('div');
        this.stats = document.createElement('div');
        this.modIcon = document.createElement('div');
        this.pickedStatus = document.createElement('div');

        this.bg.id = this.layerName;
        this.map.id = `${this.layerName}BG`;
        this.overlay.id = `${this.layerName}Overlay`;
        this.blinkoverlay.id = `${this.layerName}BlinkOverlay`;
        this.artist.id = `${this.layerName}ARTIST`;
        this.title.id = `${this.layerName}TITLE`;
        this.difficulty.id = `${this.layerName}DIFF`;
        this.stats.id = `${this.layerName}Stats`;
        this.modIcon.id = `${this.layerName}ModIcon`;
        this.pickedStatus.id = `${this.layerName}STATUS`;

        this.artist.setAttribute('class', 'mapInfo artist');
        this.title.setAttribute('class', 'mapInfo title');
        this.difficulty.setAttribute('class', 'mapInfo diff');
        this.map.setAttribute('class', 'map');
        this.pickedStatus.setAttribute('class', 'pickingStatus');
        this.overlay.setAttribute('class', 'overlay');
        this.blinkoverlay.setAttribute('class', 'blinkoverlay');
        this.bg.setAttribute('class', 'statBG');
        this.modIcon.setAttribute('class', `modIcon icon-${this.mods.toLowerCase()}`);
        this.modIcon.innerHTML = `${this.mods}`;
        this.clicker.setAttribute('class', 'clicker');
        clickerObj.appendChild(this.map);
        document.getElementById(this.map.id).appendChild(this.overlay);
        document.getElementById(this.map.id).appendChild(this.blinkoverlay);
        document.getElementById(this.map.id).appendChild(this.artist);
        document.getElementById(this.map.id).appendChild(this.title);
        document.getElementById(this.map.id).appendChild(this.difficulty);
        clickerObj.appendChild(this.pickedStatus);
        clickerObj.appendChild(this.bg);
        clickerObj.appendChild(this.modIcon);

        this.clicker.style.transform = 'translateY(0)';
    }
    grayedOut() {
        this.overlay.style.opacity = '1';
    }
}

socket.onmessage = async (event) => {
    // let data = JSON.parse(event.data);

    // if (!hasSetup) setupBeatmaps();

    // if (blueName !== data.tourney.manager.teamName.right && data.tourney.manager.teamName.right) {
    //     blueName = data.tourney.manager.teamName.right || 'Blue';
    // }
    // if (redName !== data.tourney.manager.teamName.left && data.tourney.manager.teamName.left) {
    //     redName = data.tourney.manager.teamName.left || 'Red';
    // }

    // if (tempImg !== data.menu.bm.path.full) {
    //     tempImg = data.menu.bm.path.full;
    //     data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g, '%23').replace(/%/g, '%25').replace(/\\/g, '/');
    // }
    // if (tempMapID !== data.menu.bm.id || tempSR !== data.menu.bm.stats.fullSR) {
    //     tempMapID = data.menu.bm.id;
    //     tempMapArtist = data.menu.bm.metadata.artist;
    //     tempMapTitle = data.menu.bm.metadata.title;
    //     tempMapDiff = '[' + data.menu.bm.metadata.difficulty + ']';
    //     tempMapper = data.menu.bm.metadata.mapper;

    //     tempCS = data.menu.bm.stats.CS;
    //     tempAR = data.menu.bm.stats.AR;
    //     tempOD = data.menu.bm.stats.OD;
    //     tempHP = data.menu.bm.stats.HP;
    //     tempSR = data.menu.bm.stats.fullSR;
    // }
};

async function setupBeatmaps() {
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

    const bms = [];
    try {
        $.ajaxSetup({ cache: false });
        const jsonData = await $.getJSON(`../_data/beatmaps.json`);
        console.log(jsonData.beatmaps.map(b => b.beatmap_id));
        jsonData.beatmaps.map((beatmap) => {
            bms.push(beatmap);
        });
    } catch (error) {
        console.error('Could not read JSON file', error);
    }

    (function countMods() {
        bms.map((beatmap) => {
            modsCount[beatmap.mods]++;
        });
    })();

    let row = -1;
    let preMod = 0;
    let colIndex = 0;

    function setPickedMap(bm, event) {
        if (lastPicked !== null) {
            lastPicked.blinkoverlay.style.animation = 'none';
        }
        lastPicked = bm;
        bm.pickedStatus.style.color = '#f5f5f5';
        bm.overlay.style.opacity = event.ctrlKey ? '0.95' : '0.85';
        bm.blinkoverlay.style.animation = event.ctrlKey
            ? 'none'
            : 'blinker 1s cubic-bezier(.36,.06,.01,.57) 300ms 8, slowPulse 5000ms ease-in-out 8000ms 18'; // 36 * 5s -> 180s of slow pulse (+8s), enough to run down 120s countdown but short enough to reset before next time mappool is shown
        bm.artist.style.opacity = '0.3';
        bm.title.style.opacity = '0.3';
        bm.difficulty.style.opacity = '0.3';
        bm.modIcon.style.opacity = '0.3';
        bm.bg.style.opacity = '0';
    }

    function resetMapPick(bm) {
        bm.overlay.style.opacity = '0.5';
        bm.blinkoverlay.style.animation = 'none';
        bm.artist.style.opacity = '1';
        bm.title.style.opacity = '1';
        bm.difficulty.style.opacity = '1';
        bm.modIcon.style.opacity = '1';
        bm.bg.style.opacity = '1';
        bm.pickedStatus.style.opacity = '0';
        bm.pickedStatus.style.boxShadow = 'none';
        bm.pickedStatus.style.outline = 'none';
    }

    bms.map(async (beatmap, index) => {
        if (beatmap.mods !== preMod || colIndex % 3 === 0) {
            preMod = beatmap.mods;
            colIndex = 0;
            row++;
        }
        let oddRow = Math.round(modsCount[beatmap.mods] / 3) + 1;
        let leftCol = modsCount[beatmap.mods] % 3;
        const bm = new Beatmap(beatmap.mods, beatmap.beatmap_id, `map${index}`);
        bm.generate();
        bm.clicker.addEventListener('mousedown', function () {
            bm.clicker.addEventListener('click', function (event) {
                if (!event.shiftKey) {
                    setPickedMap(bm, event);
                    document.cookie = `lastPick=${bm.beatmapID}-red;path=/`;
                    setTimeout(function () {
                        bm.pickedStatus.style.opacity = '1';
                        bm.pickedStatus.style.outline = bm.mods.includes("TB") ? "3px solid #FFF" : event.ctrlKey ? 'none' : '3px solid #ff8d8d';
                        bm.pickedStatus.innerHTML = bm.mods.includes("TB") ? "Tiebreaker triggered" : event.ctrlKey ? `<b class="pickRed">${redName}</b> ban` : `<b class="pickRed">${redName}</b> pick`;
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
                    document.cookie = `lastPick=${bm.beatmapID}-blue;path=/`;
                    setTimeout(function () {
                        bm.pickedStatus.style.opacity = '1';
                        bm.pickedStatus.style.outline = bm.mods.includes("TB") ? "3px solid #FFF" : event.ctrlKey ? 'none' : '3px solid #93b5ff';
                        bm.pickedStatus.innerHTML = bm.mods.includes("TB") ? "Tiebreaker triggered" : event.ctrlKey ? `<b class="pickBlue">${blueName}</b> ban` : `<b class="pickBlue">${blueName}</b> pick`;
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
        const stored_beatmaps = await load_maps();
        const mapData = await getDataSet(stored_beatmaps, beatmap.beatmap_id);
        bm.map.style.backgroundImage = `url('https://assets.ppy.sh/beatmaps/${mapData.beatmapset_id}/covers/cover.jpg')`;
        bm.artist.innerHTML = `${mapData.artist}`;
        bm.title.innerHTML = `${mapData.title}`;
        bm.difficulty.innerHTML = `[${mapData.version}] mapped by ${mapData.creator}`;
        beatmaps.add(bm);
    });
}

function getDataSet(stored_beatmaps, beatmap_id) {
    let beatmap = stored_beatmaps.find(b => b.beatmap_id == beatmap_id);
    return beatmap || null;
};


pickOrder("blue");
banOrder("blue");
setRound("QF");
generateTiles(firstPick, firstBan, banNum, bestOf);

