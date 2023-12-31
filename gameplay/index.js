// Connecting to server
let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws")
socket.onopen = () => console.log("Successfully Connected")
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
    socket.send("Client Closed!")
};
socket.onerror = error => console.log("Socket Error: ", error)

// Player Details
let playerLeftName = $("#playerLeftName")
let playerLeftRank = $("#playerLeftRank")
let playerRightName = $("#playerRightName")
let playerRightRank = $("#playerRightRank")
let currentPlayerID0
let currentPlayerID1

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

// Stars
let playerLeftMatchScore = $("#playerLeftMatchScore")
let playerRightMatchScore = $("#playerRightMatchScore")
let currentBestOf
let currentMatchScoreRed
let currentMatchScoreBlue
let starVisibility

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

// Map Background
let bottomBackground = $("#bottomBackground")
let currentSongSetID

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
let currentRoundName
let currentRoundNameExtended

// Current Pool
let allMaps = []
const getPoolInfo = async function() {
    let poolInformationRequest = new XMLHttpRequest()
    poolInformationRequest.open("GET","https://trt2.btmc.live/api/maps/all")
    poolInformationRequest.onreadystatechange = function() {
        if (this.status == 404) return
        if (this.readyState != 4) return
        allMaps = JSON.parse(this.responseText)

        for (let i = 0; i < allMaps.length; i++) {
            allMaps[i].metadata = JSON.parse(allMaps[i].metadata)
        }
        console.log(allMaps)
    }
    await poolInformationRequest.send()
}

getPoolInfo()

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

    // Player Details
    if (currentPlayerID0 != data.tourney.ipcClients[0].spectating.userID) {
        currentPlayerID0 = data.tourney.ipcClients[0].spectating.userID
        playerLeftName.text(data.tourney.ipcClients[0].spectating.name)
        playerLeftRank.text(`#${data.tourney.ipcClients[0].spectating.globalRank}`)
    }
    if (currentPlayerID1 != data.tourney.ipcClients[1].spectating.userID) {
        currentPlayerID1 = data.tourney.ipcClients[1].spectating.userID
        playerRightName.text(data.tourney.ipcClients[1].spectating.name)
        playerRightRank.text(`#${data.tourney.ipcClients[1].spectating.globalRank}`)
    }

    // Song Details
    if (currentSongID != data.menu.bm.id) {
        currentSongID = data.menu.bm.id
        poolMapFound = false
        mapModSlot.css("display", "none")

        for (let i = 0; i < allMaps.length; i++) {
            if (allMaps[i].osuMapId == currentSongID) {
                poolMapFound = true
                mapModSlot.css("display","block")
                mapModSlot.text(allMaps[i].mod)
                currentSR = allMaps[i].postModSr
                animation.SRStat.update(currentSR)

                // Map Mod Slot Color
                currentMapMod = allMaps[i].mod.toUpperCase().slice(0,2)
                switch (currentMapMod) {
                    case "NM": mapModSlot.css("background-color","#919191"); break;
                    case "HD": mapModSlot.css("background-color","#ffc728"); break;
                    case "HR": mapModSlot.css("background-color","#f4154b"); break;
                    case "DT": mapModSlot.css("background-color","#b013f2"); break;
                    case "FM": mapModSlot.css("background-color","#17b7ff"); break;
                    case "TB": mapModSlot.css("background-color","#ff1df5"); break;
                }
                
                // AR
                currentBaseAR = allMaps[i].metadata.diff_approach
                animation.mapStatsAR.update(currentBaseAR)
                // OD
                currentBaseOD = allMaps[i].metadata.diff_overall
                animation.mapStatsOD.update(currentBaseOD)
                // CS
                currentBaseCS = allMaps[i].metadata.diff_size
                animation.mapStatsCS.update(currentBaseCS)
                // BPM
                currentBaseBPM = allMaps[i].metadata.bpm
                animation.mapStatsBPM.update(currentBaseBPM)
                // Song Title and Artist
                currentSongArtist = allMaps[i].metadata.artist
                currentSongName = allMaps[i].metadata.title
                mapArtistAndName.text(currentSongArtist + " - " + currentSongName)
                
                if (mapArtistAndName.width() >= 425) mapArtistAndName.addClass("mapArtistAndNameWrap")
                else mapArtistAndName.removeClass("mapArtistAndNameWrap")
                // Difficulty
                currentSongDifficulty = allMaps[i].metadata.version
                mapDifficulty.text(`[${currentSongDifficulty.toUpperCase()}]`)

                if (mapDifficulty.width() >= 375) mapDifficulty.addClass("mapDifficultyWrap")
                else mapDifficulty.removeClass("mapDifficultyWrap")
                // Set Creator
                currentSongSetCreator = allMaps[i].metadata.creator
                mapSetCreator.text(currentSongSetCreator.toUpperCase())
                // Set / BG
                currentSongSetID = allMaps[i].metadata.beatmapset_id
                bottomBackground.css("backgroundImage",`url("https://assets.ppy.sh/beatmaps/${currentSongSetID}/covers/cover.jpg")`)
                break
            }
        }
    }

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
            currentBPM = (currentMapMod.toLowerCase().includes("dt"))? currentBaseBPM *= 1.5 : currentBaseBPM
            animation.mapStatsBPM.update(currentBPM)
        }
        // Song Title and Artist
        if (currentSongArtist != data.menu.bm.metadata.artist || currentSongName != data.menu.bm.metadata.title) {
            currentSongArtist = data.menu.bm.metadata.artist
            currentSongName = data.menu.bm.metadata.title
            mapArtistAndName.text(currentSongArtist + " - " + currentSongName)
            
            if (mapArtistAndName.width() >= 375) mapArtistAndName.addClass("mapArtistAndNameWrap")
            else mapArtistAndName.removeClass("mapArtistAndNameWrap")
        }
        // Diff Name
        if (currentSongDifficulty != data.menu.bm.metadata.difficulty) {
            currentSongDifficulty = data.menu.bm.metadata.difficulty
            mapDifficulty.text(`[${currentSongDifficulty.toUpperCase()}]`)

            if (mapDifficulty.width() >= 375) mapDifficulty.addClass("mapDifficultyWrap")
            else mapDifficulty.removeClass("mapDifficultyWrap")
        }
        // Set Creator Name
        if (currentSongSetCreator != data.menu.bm.metadata.mapper) {
            currentSongSetCreator = data.menu.bm.metadata.mapper
            mapSetCreator.text(currentSongSetCreator.toUpperCase())
        }
        // Set / BG
        if (currentSongSetID != data.menu.bm.set) {
            currentSongSetID = data.menu.bm.set
            bottomBackground.css("backgroundImage",`url("https://assets.ppy.sh/beatmaps/${currentSongSetID}/covers/cover.jpg")`)
        }
    }


    // Star Visibility
    if (starVisibility != data.tourney.manager.bools.starVisible) {
        starVisibility = data.tourney.manager.bools.starVisible
        if (starVisibility) {
            playerLeftMatchScore.css("opacity", 1)
            playerRightMatchScore.css("opacity", 1)
        } else {
            playerLeftMatchScore.css("opacity", 0)
            playerRightMatchScore.css("opacity", 0)
        }
    }
    // Star Generation
    if (currentBestOf != Math.ceil(data.tourney.manager.bestOF / 2) ||
        currentMatchScoreRed != data.tourney.manager.stars.left ||
        currentMatchScoreBlue != data.tourney.manager.stars.right) {
            
        currentBestOf = Math.ceil(data.tourney.manager.bestOF / 2)
        currentMatchScoreRed = data.tourney.manager.stars.left
        currentMatchScoreBlue = data.tourney.manager.stars.right
        playerLeftMatchScore.html("")
        playerRightMatchScore.html("")
        // Left Stars
        let i = 0
        for (i; i < currentMatchScoreRed; i++) {
            let imgStar = document.createElement("img")
            imgStar.classList.add("playerMatchScoreSword")
            imgStar.classList.add("playerMatchScoreSwordLeft")   
            imgStar.setAttribute("src", "static/whiteStar.png")
            playerLeftMatchScore.append(imgStar)
        }
        for (i; i < currentBestOf; i++) {
            let imgStar = document.createElement("img")
            imgStar.classList.add("playerMatchScoreSword")
            imgStar.classList.add("playerMatchScoreSwordLeft")    
            imgStar.setAttribute("src", "static/redStar.png")
            playerLeftMatchScore.append(imgStar)
        }
        // Right Stars
        i = 0;
        for (i; i < currentMatchScoreBlue; i++) {
            let imgStar = document.createElement("img")
            imgStar.classList.add("playerMatchScoreSword")
            imgStar.classList.add("playerMatchScoreSwordRight")            
            imgStar.setAttribute("src", "static/whiteStar.png")
            playerRightMatchScore.append(imgStar)
        }
        for (i; i < currentBestOf; i++) {
            let imgStar = document.createElement("img")
            imgStar.classList.add("playerMatchScoreSword")
            imgStar.classList.add("playerMatchScoreSwordRight")
            imgStar.setAttribute("src", "static/blueStar.png")
            playerRightMatchScore.append(imgStar)
        }

        // If win, submit to winscreen
        if (currentMatchScoreRed == currentBestOf) setCookieToWinScreen(currentPlayerID0, data.tourney.ipcClients[0].spectating.name, "red", currentRoundNameExtended)
        else if (currentMatchScoreBlue == currentBestOf) setCookieToWinScreen(currentPlayerID1, data.tourney.ipcClients[1].spectating.name, "blue", currentRoundNameExtended)
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

const changeCommentatorNames = () => {
    if (commentatorNameInput1.val().trim().toLowerCase() == "empty") commentatorName1.innerText = ""
    else if (commentatorNameInput1.val().trim() != "") commentatorName1.innerText = commentatorNameInput1.val().trim().toUpperCase()

    if (commentatorNameInput2.val().trim().toLowerCase() == "empty") commentatorName2.innerText = ""
    else if (commentatorNameInput2.val().trim() != "") commentatorName2.innerText = commentatorNameInput2.val().trim().toUpperCase()
}

const changeRoundInformation = (roundAbbreviation, roundText) => {
    roundName.text(roundText)
    currentRoundName = roundAbbreviation
    currentRoundNameExtended = roundText

    let cookieValue = `roundName=${roundAbbreviation}; path=/`
    document.cookie = cookieValue
}

// Cookie to Win Screen
const setCookieToWinScreen = (id, name, team, round) => {
    let cookieValue = `winscreenWinnerID=${id}; path=/`
    document.cookie = cookieValue
    cookieValue = `winscreenWinnerName=${name}; path=/`
    document.cookie = cookieValue
    cookieValue = `winscreenWinnerTeam=${team}; path=/`
    document.cookie = cookieValue
    cookieValue = ` winscreenRoundName=${round}; path=/`
    document.cookie = cookieValue
}

let playerLeftMapPickText = $("#playerLeftMapPickText")
let playerRightMapPickText = $("#playerRightMapPickText")

// Cookie Setting for this screen
window.setInterval(() => {
    let cookieName = "roundName"
    let match = document.cookie.match(`(?:^|.*)${cookieName}=(.+?)(?:$|[|;].*)`)
    if (match && currentRoundName != match[1]) {
        switch (currentRoundName) {
            case "RO16": changeRoundInformation(currentRoundName, "ROUND OF 16"); break;
            case "QF": changeRoundInformation(currentRoundName, "QUARTERFINALS"); break;
            case "SF": changeRoundInformation(currentRoundName, "SEMIFINALS"); break;
            case "F": changeRoundInformation(currentRoundName, "FINALS"); break;
            case "GF": changeRoundInformation(currentRoundName, "GRAND FINALS"); break;
            case "BR1v1": changeRoundInformation(currentRoundName, "BR GRAND FINALS"); break;
        }
    }

    cookieName = "lastPick"
    match = document.cookie.match(`(?:^|.*)${cookieName}=(.+?)(?:$|[|;].*)`)
    if (match != null) {
        if (match[1] == "red") {
            playerLeftMapPickText.css("display","block")
            playerRightMapPickText.css("display","none")
        } else if (match[1] == "blue") {
            playerLeftMapPickText.css("display","none")
            playerRightMapPickText.css("display","block")
        }
    }
}, 500)