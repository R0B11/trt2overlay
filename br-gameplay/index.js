// Connecting to server
let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws")
socket.onopen = () => console.log("Successfully Connected")
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
    socket.send("Client Closed!")
};
socket.onerror = error => console.log("Socket Error: ", error)

// Map Stats
let mapStatNumberAR = $("#mapStatNumberAR")
let mapStatNumberOD = $("#mapStatNumberOD")
let SRStat = $("#SRStat")
let mapStatNumberCS = $("#mapStatNumberCS")
let mapStatNumberBPM = $("#mapStatNumberBPM")
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
let currentSongArtistandName = $("#currentSongArtistandName")
let currentMapDifficulty = $("#currentMapDifficulty")
let currentMapSetCreator = $("currentMapSetCreator")
let currentSongArtist
let currentSongName
let currentSongDifficulty
let currentSongSetCreator
let currentSongID
let poolMapFound = false

// Player IDs
let userID0 = 0
let userID1 = 0
let userID2 = 0
let userID3 = 0
let userID4 = 0
let userID5 = 0
let userID6 = 0
let userID7 = 0
let arrayOfIDs = [userID0, userID1, userID2, userID3, userID4, userID5, userID6, userID7]
// Player Objects
let player0 = { userID: userID0, username: "", domElement: "", score: 0, rank: "0th" }
let player1 = { userID: userID1, username: "", domElement: "", score: 0, rank: "0th" }
let player2 = { userID: userID2, username: "", domElement: "", score: 0, rank: "0th" }
let player3 = { userID: userID3, username: "", domElement: "", score: 0, rank: "0th" }
let player4 = { userID: userID4, username: "", domElement: "", score: 0, rank: "0th" }
let player5 = { userID: userID5, username: "", domElement: "", score: 0, rank: "0th" }
let player6 = { userID: userID6, username: "", domElement: "", score: 0, rank: "0th" }
let player7 = { userID: userID7, username: "", domElement: "", score: 0, rank: "0th" }
let arrayOfPlayers = [player0, player1, player2, player3, player4, player5, player6, player7]

// Score Visibility
let currentScoreVisibility

// Number of Players
let currentNumberOfPlayers = 0
let previousNumberOfPlayers = 0
// Player IDs
let currentPlayerIDs = []
let previousPlayerIDs = []
// Player Objects
let currentPlayers = []
let previousPlayers = []
// Player Ranks
let sortedPlayers = []

// Player Sections
let leftSidePlayers = $("#leftSidePlayers")
let rightSidePlayers = $("#rightSidePlayers")
let loadFirstTime = true

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

let animation = {
    SRStat: new CountUp('SRStat', 0, 0, 2, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: ".", suffix: "*"}),
    mapStatNumberAR: new CountUp('mapStatNumberAR', 0, 0, 1, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    mapStatNumberOD: new CountUp('mapStatNumberOD', 0, 0, 1, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    mapStatNumberCS: new CountUp('mapStatNumberCS', 0, 0, 1, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    mapStatNumberBPM: new CountUp('mapStatNumberBPM', 0, 0, 0, .5, {useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
}

let playerScoreAnimation = {}

socket.onmessage = event => {
    let data = JSON.parse(event.data)
    console.log(data)

    if (currentSongID != data.menu.bm.id) {
        currentSongID = data.menu.bm.id
        poolMapFound = false

        // Call API for the SR
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
                mapModSlot.css("display","none")
            }
        }
        SRRequest.send()
    }
    // If map is not in mappool
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
            animation.mapStatNumberAR.update(currentAR)
        }
        // OD
        if ( currentBaseOD != data.menu.bm.stats.OD) {
            currentBaseOD = data.menu.bm.stats.OD
            currentOD = calculateARandOD(currentBaseOD, currentMapMod)   
            animation.mapStatNumberOD.update(currentOD)
        }
        // CS
        if (currentBaseCS != data.menu.bm.stats.CS) {
            currentBaseCS = data.menu.bm.stats.CS
            if (currentMapMod.toLowerCase().includes("hr")) currentBaseCS *= 1.3
            else currentCS = currentBaseCS
            animation.mapStatNumberCS.update(currentCS)
        }
        // BPM
        if (!poolMapFound && currentBaseBPM != data.menu.bm.stats.BPM.min) {
            currentBaseBPM = data.menu.bm.stats.BPM.min
            if (currentMapMod.toLowerCase().includes("dt")) currentBaseBPM *= 1.5
            else currentBPM = currentBaseBPM
            animation.mapStatNumberBPM.update(currentBPM)
        }
        // Song Title and Artist
        if (currentSongArtist != data.menu.bm.metadata.artist || currentSongName != data.menu.bm.metadata.title) {
            currentSongArtist = data.menu.bm.metadata.artist
            currentSongName = data.menu.bm.metadata.title
            currentSongArtistandName.text(currentSongArtist + " - " + currentSongName)

            if (currentSongArtistandName.width() >= 375) currentSongArtistandName.addClass("currentSongArtistandNameWrap")
            else currentSongArtistandName.removeClass("currentSongArtistandNameWrap")
        }
        // Diff Name
        if (currentSongDifficulty != data.menu.bm.metadata.difficulty) {
            currentSongDifficulty = data.menu.bm.metadata.difficulty
            currentMapDifficulty.text(`[${currentSongDifficulty.toUpperCase()}]`)
        }
        // Set Creator Name
        if (currentSongSetCreator != data.menu.bm.metadata.mapper) {
            currentSongSetCreator =  data.menu.bm.metadata.mapper
            currentMapSetCreator.text(currentSongSetCreator)
        }
    }

    // Update all player details
    if (userID0 != data.tourney.ipcClients[0].spectating.userID) {
        userID0 = data.tourney.ipcClients[0].spectating.userID
        arrayOfIDs[0] = userID0
        player0.userID = userID0
        player0.username = data.tourney.ipcClients[0].spectating.name
    }
    if (userID1 != data.tourney.ipcClients[1].spectating.userID) {
        userID1 = data.tourney.ipcClients[1].spectating.userID
        arrayOfIDs[1] = userID1
        player1.userID = userID1
        player1.username = data.tourney.ipcClients[1].spectating.name
    }
    if (userID2 != data.tourney.ipcClients[2].spectating.userID) {
        userID2 = data.tourney.ipcClients[2].spectating.userID
        arrayOfIDs[2] = userID2
        player2.userID = userID2
        player2.username = data.tourney.ipcClients[2].spectating.name
    }
    if (userID3 != data.tourney.ipcClients[3].spectating.userID) {
        userID3 = data.tourney.ipcClients[3].spectating.userID
        arrayOfIDs[3] = userID3
        player3.userID = userID3
        player3.username = data.tourney.ipcClients[3].spectating.name
    }
    if (userID4 != data.tourney.ipcClients[4].spectating.userID) {
        userID4 = data.tourney.ipcClients[4].spectating.userID
        arrayOfIDs[4] = userID4
        player4.userID = userID4
        player4.username = data.tourney.ipcClients[4].spectating.name
    }
    if (userID5 != data.tourney.ipcClients[5].spectating.userID) {
        userID5 = data.tourney.ipcClients[5].spectating.userID
        arrayOfIDs[5] = userID5
        player5.userID = userID5
        player5.username = data.tourney.ipcClients[5].spectating.name
    }
    if (userID6 != data.tourney.ipcClients[6].spectating.userID) {
        userID6 = data.tourney.ipcClients[6].spectating.userID
        arrayOfIDs[6] = userID6
        player6.userID = userID6
        player6.username = data.tourney.ipcClients[6].spectating.name
    }
    if (userID7 != data.tourney.ipcClients[7].spectating.userID) {
        userID7 = data.tourney.ipcClients[7].spectating.userID
        arrayOfIDs[7] = userID7
        player7.userID = userID7
        player7.username = data.tourney.ipcClients[7].spectating.name
    }

    // Count number of players from the list
    previousNumberOfPlayers = currentNumberOfPlayers
    currentNumberOfPlayers = 0
    for (let i = 0; i < arrayOfIDs.length; i++) if (arrayOfIDs[i] != 0) {
        currentNumberOfPlayers++
    }
    if (previousNumberOfPlayers != currentNumberOfPlayers) {
        leftSidePlayers.html("")
        rightSidePlayers.html("")
        
        let i;
        for (i = 0; i < currentNumberOfPlayers / 2; i++) {
            // Append players to left hand side
            let playerContainerDiv = document.createElement("div")
            let playerWrapperDiv = document.createElement("div")
            let playerNameDiv = document.createElement("div")
            let playerScoreDiv = document.createElement("div")
            let playerRankDiv = document.createElement("div")

            playerContainerDiv.classList.add("playerContainer")
            playerWrapperDiv.classList.add("playerWrapper")
            playerNameDiv.classList.add("playerName")
            playerScoreDiv.classList.add("playerScore")
            playerRankDiv.classList.add("playerRankLeft")

            playerContainerDiv.setAttribute("id",`player${i}Container`)
            playerNameDiv.setAttribute("id",`player${i}Name`)
            playerScoreDiv.setAttribute("id",`player${i}Score`)
            playerScoreDiv.innerText = "0"
            playerRankDiv.setAttribute("id",`player${i}Rank`)

            playerWrapperDiv.append(playerNameDiv)
            playerWrapperDiv.append(playerScoreDiv)
            playerWrapperDiv.append(playerRankDiv)
            playerContainerDiv.append(playerWrapperDiv)
            leftSidePlayers.append(playerContainerDiv)

            playerScoreAnimation[`player${i}Score`] =  new CountUp(`player${i}Score`, 0, 0, 0, .2, {useEasing: true, useGrouping: true, separator: ",", decimal: "." })
        }
        for (i; i < currentNumberOfPlayers; i++) {
            // Append players to right hand side
            let playerContainerDiv = document.createElement("div")
            let playerWrapperDiv = document.createElement("div")
            let playerNameDiv = document.createElement("div")
            let playerScoreDiv = document.createElement("div")
            let playerRankDiv = document.createElement("div")

            playerContainerDiv.classList.add("playerContainer")
            playerContainerDiv.classList.add("playerContainerRight")
            playerWrapperDiv.classList.add("playerWrapper")
            playerNameDiv.classList.add("playerName")
            playerNameDiv.classList.add("playerDetailsRight")
            playerNameDiv.classList.add("floatRight")
            playerScoreDiv.classList.add("playerScore")
            playerScoreDiv.classList.add("playerDetailsRight")
            playerScoreDiv.classList.add("floatRight")
            playerRankDiv.classList.add("playerRankRight")

            playerContainerDiv.setAttribute("id",`player${i}Container`)
            playerNameDiv.setAttribute("id",`player${i}Name`)
            playerScoreDiv.setAttribute("id",`player${i}Score`)
            playerScoreDiv.innerText = "0"
            playerRankDiv.setAttribute("id",`player${i}Rank`)

            playerWrapperDiv.append(playerNameDiv)
            playerWrapperDiv.append(playerScoreDiv)
            playerWrapperDiv.append(playerRankDiv)
            playerContainerDiv.append(playerWrapperDiv)
            rightSidePlayers.append(playerContainerDiv)

            playerScoreAnimation[`player${i}Score`] =  new CountUp(`player${i}Score`, 0, 0, 0, .2, {useEasing: true, useGrouping: true, separator: ",", decimal: "." })
        }
    }

    // Put players into correct positions
    // Get list of players
    previousPlayerIDs = [...currentPlayerIDs]
    currentPlayerIDs = []
    let previousAndCurrentIDsSame = true
    previousPlayers = [...currentPlayers]
    currentPlayers = []
    for (let i = 0; i < arrayOfIDs.length; i++) if (arrayOfIDs[i] != 0) currentPlayerIDs.push(arrayOfIDs[i])
    for (let i = 0; i < currentPlayerIDs.length; i++) {
        for (let j = 0; j < arrayOfPlayers.length; j++) {
            if (currentPlayerIDs[i] == arrayOfPlayers[j].userID) {
                currentPlayers.push(arrayOfPlayers[j])
                break
            }
        }
    }
    // Check previousAndCurrentIDsSame
    if (previousPlayerIDs.length == currentPlayerIDs.length) {
        for (var i = 0; i < previousPlayerIDs.length; i++) {
            if (previousPlayerIDs[i] != currentPlayerIDs[i]) previousAndCurrentIDsSame = false
            if (!previousAndCurrentIDsSame) break
        }
    } else previousAndCurrentIDsSame = false

    // Both conditions have to be met if we are to skip the addition of this step
    if (!previousAndCurrentIDsSame || previousNumberOfPlayers != currentNumberOfPlayers || loadFirstTime) {
        loadFirstTime = false
        // Clear DOM element, score, and rank for all players
        for (let i = 0; i < arrayOfPlayers.length; i++) {
            arrayOfPlayers[i].domElement = ""
            arrayOfPlayers[i].score = 0
            arrayOfPlayers[i].rank = "0th"
        }

        // Adding names and score
        let i
        let leftSidePlayers1 = document.getElementById("leftSidePlayers")
        let rightSidePlayers1 = document.getElementById("rightSidePlayers")
        console.log(rightSidePlayers1.children[0])
        console.log(rightSidePlayers1.childElementCount)
        for (i = 0; i < leftSidePlayers1.childElementCount; i++) {
            let name = leftSidePlayers1.children[i].children[0].children[0]
            let score = leftSidePlayers1.children[i].children[0].children[1]
            name.innerText = currentPlayers[i].username.toUpperCase()
            name.style.color = `var(--player${i + 1}Color)`
            score.innerText = currentPlayers[i].score
            currentPlayers[i].domElement = document.getElementById(`player${i}Container`)
        }
        for (let j = 0; j < rightSidePlayers1.childElementCount; j++) {
            let name = rightSidePlayers1.children[j].children[0].children[0]
            let score = rightSidePlayers1.children[j].children[0].children[1]
            name.innerText = currentPlayers[i].username.toUpperCase()
            name.style.color = `var(--player${i + 1}Color)`
            score.innerText = currentPlayers[i].score
            currentPlayers[i].domElement = document.getElementById(`player${i}Container`)
            i++
        }
    }

    // Score Visibility
    if (currentScoreVisibility != data.tourney.manager.bools.scoreVisible) currentScoreVisibility = data.tourney.manager.bools.scoreVisible
    if (currentScoreVisibility) {
        // Set and update all scores for all players
        for (let i = 0; i < currentPlayers.length; i++) {
            for (let j = 0; j < data.tourney.ipcClients.length; j++) {
                if (currentPlayers[i].userID == data.tourney.ipcClients[j].spectating.userID) {
                    currentPlayers[i].score = data.tourney.ipcClients[j].gameplay.score
                    playerScoreAnimation[`player${i}Score`].update(currentPlayers[i].score)
                    break
                }
            }
        }

        // Sort players
        sortedPlayers = currentPlayers.sort((a, b) => b.score - a.score)
        

        // Place ranking next to name
        for (let i = 0; i < sortedPlayers.length; i++) {
            currentElement = sortedPlayers[i].domElement.lastChild.lastChild
            currentElementInnerText = currentElement.innerText
            if (i == 0) {
                currentElement.innerText = "1st"
                currentElement.style.color = "var(--numberOnePlaceColour)"
            } else if (i == 1) {
                currentElement.innerText = "2nd"
                currentElement.style.color = "var(--numberTwoPlaceColour)"
            } else if (i == 2) {
                currentElement.innerText = "3rd"
                currentElement.style.color = "var(--numberThreePlaceColour)"
            } else {
                currentElement.innerText = `${i + 1}th`
                currentElement.style.color = "white"
            }
        }
    }
}