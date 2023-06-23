// Connecting to server
let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws")
socket.onopen = () => console.log("Successfully Connected")
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
    socket.send("Client Closed!")
};
socket.onerror = error => console.log("Socket Error: ", error)

// Map Stats
let mapStatsAR = $("#mapStatsAR")
let mapStatsOD = $("#mapStatsOD")
let mapStatsCS = $("#mapStatsCS")
let mapStatsBPM = $("#mapStatsBPM")
let SRStat = $("#SRStat")
let mapModSlot = $("#mapModSlot")
let currentBaseAR 
let currentBaseOD 
let currentBaseCS 
let currentBaseBPM
let currentAR
let currentOD
let currentSR
let currentCS 
let currentBPM
let currentMapMod = ""

// Map Details
let mapArtistAndName = $("#mapArtistAndName")
let mapDifficulty = $("#mapDifficulty")
let mapSetCreator = $("#mapSetCreator")
let currentSongArtist
let currentSongName
let currentSongDifficulty
let currentSongSetCreator
let currentSongID
let poolMapFound = false

// Chat 
let scoreVisibility = false
let chatDisplay = document.getElementById("chatDisplay");
let chatLen = 0;
let chatColour;
// Chat Controls
let mapStats = document.getElementById("mapStats");
let mapScores = document.getElementById("mapScores");
let mapDetails = document.getElementById("mapDetails");

// Scores
let redMapScore = $("#redMapScore")
let blueMapScore = $("#blueMapScore")
let mapScoreDifference = $("#mapScoreDifference")
let equalEllipse = $("#equalEllipse")
let currentMapScoreRed
let currentMapScoreBlue
let currentMapScoreDifference

// Commentator Names
let commentatorNameInput1 = $("#commentatorNameInput1")
let commentatorNameInput2 = $("#commentatorNameInput2")
let commentatorName1 = document.getElementById("commentatorName1")
let commentatorName2 = document.getElementById("commentatorName2")

// Round Name
let roundName = $("#roundName")

let animation = {
    SRStat: new CountUp('SRStat', 0, 0, 2, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: ".", suffix: "*"}),
    mapStatsAR: new CountUp('mapStatsAR', 0, 0, 1, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    mapStatsOD: new CountUp('mapStatsOD', 0, 0, 1, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    mapStatsCS: new CountUp('mapStatsCS', 0, 0, 1, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    mapStatsBPM: new CountUp('mapStatsBPM', 0, 0, 0, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    redMapScore: new CountUp('redMapScore', 0, 0, 0, .2, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    blueMapScore: new CountUp('blueMapScore', 0, 0, 0, .2, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    mapScoreDifference: new CountUp('mapScoreDifference', 0, 0, 0, .2, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
}

// Calculate AR and OD
let calculateARandOD = (baseNumber, mod) => {
    let newNumber = 0;
    if (mod.toLowerCase().includes("hr")) newNumber = baseNumber *= 1.4
    else if (mod.toLowerCase().includes("dt")) {
        if (baseNumber <= 5) newNumber = (1800-((1800 - baseNumber)*2/3))/120
        else newNumber = ((1200-((1200-(baseNumber-5)*150)*2/3))/150)+5
    } else newNumber = baseNumber
    return newNumber
}

socket.onmessage = event => {
    let data = JSON.parse(event.data)
    console.log(data)

    if (currentSongID != data.menu.bm.id) {
        currentSongID = data.menu.bm.id
        poolMapFound = false
        mapModSlot.css("display", "none")

        // Call API for all stats
        SRRequest = new XMLHttpRequest()
        SRRequest.open("GET", `https://localhost:44395//api/maps/${currentSongID}`)
        SRRequest.onload = function() {
            if (this.status == 200) {
                poolMapFound = true
                currentSR = "" // Enter data here
                currentBaseAR = "" // Enter data here
                currentBaseOD = "" // Enter data here
                currentBaseCS = "" // Enter data here
                currentBaseBPM = "" // Enter data here
                currentMapMod = "" // Enter data here
                mapModSlot.css("display","block")
            } else {
                currentMapMod = ""
            }
        }
        SRRequest.send()
    }
    // If map is not in the mappool
    if (!poolMapFound) {
        // SR
        if (currentSR != data.menu.bm.stats.SR) {
            currentSR = data.menu.bm.stats.SR
            animation.SRStat.update(currentSR)
        }
        // AR
        if (currentBaseAR != data.menu.bm.stats.AR) {
            currentBaseAR = data.menu.bm.stats.AR
            currentAR = calculateARandOD(currentBaseAR, currentMapMod)   
            animation.mapStatsAR.update(currentAR)
        }
        // OD
        if ( currentBaseOD != data.menu.bm.stats.OD) {
            currentBaseOD = data.menu.bm.stats.OD
            currentOD = calculateARandOD(currentBaseOD, currentMapMod)   
            animation.mapStatsOD.update(currentOD)
        }
        // CS
        if (currentBaseCS != data.menu.bm.stats.CS) {
            currentBaseCS = data.menu.bm.stats.CS
            if (currentMapMod.toLowerCase().includes("hr")) currentBaseCS *= 1.3
            else currentCS = currentBaseCS
            animation.mapStatsCS.update(currentCS)
        }
        // BPM
        if (!poolMapFound && currentBaseBPM != data.menu.bm.stats.BPM.min) {
            currentBaseBPM = data.menu.bm.stats.BPM.min
            if (currentMapMod.toLowerCase().includes("dt")) currentBaseBPM *= 1.5
            else currentBPM = currentBaseBPM
            animation.mapStatsBPM.update(currentBPM)
        }
        // Song Title and Artist
        if (currentSongArtist != data.menu.bm.metadata.artist || currentSongName != data.menu.bm.metadata.title) {
            currentSongArtist = data.menu.bm.metadata.artist
            currentSongName = data.menu.bm.metadata.title
            mapArtistAndName.text(currentSongArtist + " - " + currentSongName)
            
            if (mapArtistAndName.width() >= 425) mapArtistAndName.addClass("mapArtistAndNameWrap")
            else mapArtistAndName.removeClass("mapArtistAndNameWrap")
        }
        // Diff Name
        if (currentSongDifficulty != data.menu.bm.metadata.difficulty) {
            currentSongDifficulty = data.menu.bm.metadata.difficulty
            mapDifficulty.text(`[${currentSongDifficulty.toUpperCase()}]`)
        }
        // Set Creator Name
        if (currentSongSetCreator != data.menu.bm.metadata.mapper) {
            currentSongSetCreator = data.menu.bm.metadata.mapper
            mapSetCreator.text(currentSongSetCreator.toUpperCase())
        }
    }

    if (scoreVisibility != data.tourney.manager.bools.scoreVisible) scoreVisibility = data.tourney.manager.bools.scoreVisible

    // Scores
    if (scoreVisibility) {
        chatDisplay.style.opacity = 0
        mapStats.style.opacity = 1
        mapScores.style.opacity = 1
        mapDetails.style.opacity = 1

        currentMapScoreRed = data.tourney.manager.gameplay.score.left
        currentMapScoreBlue = data.tourney.manager.gameplay.score.right
        currentMapScoreDifference = Math.abs(currentMapScoreRed - currentMapScoreBlue)

        animation.redMapScore.update(currentMapScoreRed)
        animation.blueMapScore.update(currentMapScoreBlue)
        animation.mapScoreDifference.update(currentMapScoreDifference)

        let rotation = -45
        let rotationCalculation = Math.pow(Math.abs(currentMapScoreDifference / 400000), 0.5) * 0.8
        if (rotationCalculation > 0.8) rotationCalculation = 0.8
        rotationDegrees = -rotationCalculation * 30

        if (currentMapScoreRed >= currentMapScoreBlue) { rotation -= rotationDegrees }
        else rotation += rotationDegrees

        equalEllipse.css("transform", `translateX(-50%) rotate(${rotation}deg)`)
    }
    // Chat messages
    if (!scoreVisibility) {
        chatDisplay.style.opacity = 1
        mapStats.style.opacity = 0
        mapScores.style.opacity = 0
        mapDetails.style.opacity = 0

        // Only happens if there are no new chats messages, or the chat length is the same
        if (chatLen !== data.tourney.manager.chat.length) {
            if (chatLen == 0 || (chatLen > 0 && chatLen > data.tourney.manager.chat.length)) {
                // Reset everything for a new chat.
				chatDisplay.innerHTML = "";
				chatLen = 0;
            }
            
            for (var i = chatLen; i < data.tourney.manager.chat.length; i++) {
                chatColour = data.tourney.manager.chat[i].team;

                let messageWrapper = document.createElement("div");
                messageWrapper.setAttribute('class', 'messageWrapper');

				let messageTime = document.createElement('div');
				messageTime.setAttribute('class', 'messageTime');
                messageTime.innerText = data.tourney.manager.chat[i].time;

                let wholeMessage = document.createElement("div");
                wholeMessage.setAttribute('class', 'wholeMessage');

				let messageUser = document.createElement('div');
				messageUser.setAttribute('class', 'messageUser');
                messageUser.innerText = data.tourney.manager.chat[i].name + ":\xa0";

                let messageText = document.createElement('div');
				messageText.setAttribute('class', 'messageText');
                messageText.innerText = data.tourney.manager.chat[i].messageBody;

                messageUser.classList.add(chatColour);

                messageWrapper.append(messageTime);
                messageWrapper.append(wholeMessage);
                wholeMessage.append(messageUser);
                wholeMessage.append(messageText);
                chatDisplay.append(messageWrapper);
            }
			chatLen = data.tourney.manager.chat.length;
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        }
    }
}

function changeCommentatorNames() {
    if (commentatorNameInput1.val().trim().toLowerCase() == "empty") commentatorName1.innerText = ""
    else if (commentatorNameInput1.val().trim() != "") commentatorName1.innerText = commentatorNameInput1.val().trim().toUpperCase()

    if (commentatorNameInput2.val().trim().toLowerCase() == "empty") commentatorName2.innerText = ""
    else if (commentatorNameInput2.val().trim() != "") commentatorName2.innerText = commentatorNameInput2.val().trim().toUpperCase()
}

const changeRoundInformation = (roundText) => roundName.text(roundText)