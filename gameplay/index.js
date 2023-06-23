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
                imgStar.setAttribute("src", "static/whiteStar.png")
                playerLeftMatchScore.append(imgStar)
            }
            for (i; i < currentBestOf; i++) {
                let imgStar = document.createElement("img")
                imgStar.classList.add("playerMatchScoreSword")
                imgStar.setAttribute("src", "static/redStar.png")
                playerLeftMatchScore.append(imgStar)
            }

            // Right Stars
            i = 0;
            for (i; i < currentMatchScoreBlue; i++) {
                let imgStar = document.createElement("img")
                imgStar.classList.add("playerMatchScoreSword")
                imgStar.setAttribute("src", "static/whiteStar.png")
                playerRightMatchScore.append(imgStar)
            }
            for (i; i < currentBestOf; i++) {
                let imgStar = document.createElement("img")
                imgStar.classList.add("playerMatchScoreSword")
                imgStar.setAttribute("src", "static/blueStar.png")
                playerRightMatchScore.append(imgStar)
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