// Connecting to server
let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws")
socket.onopen = () => console.log("Successfully Connected")
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
    socket.send("Client Closed!")
};
socket.onerror = error => console.log("Socket Error: ", error)

// Now Playing
let nowPlayingSongArtist = $("#nowPlayingSongArtist")
let currentSongName
let currentArtistName

socket.onmessage = event => {
    let data = JSON.parse(event.data)

    if (currentSongName != data.menu.bm.metadata.title || currentArtistName != data.menu.bm.metadata.artist) {
        currentSongName = data.menu.bm.metadata.title
        currentArtistName = data.menu.bm.metadata.artist
        nowPlayingSongArtist.text(`${currentArtistName.toUpperCase()} - ${currentSongName.toUpperCase()}`)
    }
}

// Brackets
let upperBracket = $("#upperBracket")
let lowerBracket = $("#lowerBracket")

const toWinnerBracket = () => {
    upperBracket.css("opacity", 1)
    lowerBracket.css("opacity", 0)
}
const toLoserBracket = () => {
    upperBracket.css("opacity", 0)
    lowerBracket.css("opacity", 1)
}
const pullResultsFromDatabase = () => {}

// Reset Bracket
let winnerBracketRound1 = document.getElementsByClassName("winnerBracketRound1")
let winnerBracketRound2 = document.getElementsByClassName("winnerBracketRound2")
let winnerBracketRound3 = document.getElementsByClassName("winnerBracketRound3")
let winnerBracketRound4 = document.getElementsByClassName("winnerBracketRound4")
let winnerBracketRound5And6Container = document.getElementsByClassName("winnerBracketRound5And6Container")
let lowerBracketPlayer = document.getElementsByClassName("lowerBracketPlayer")
let lowerBracketFinalsPlayer = document.getElementsByClassName("lowerBracketFinalsPlayer")

let playerTiles = [winnerBracketRound1, winnerBracketRound2, winnerBracketRound3, winnerBracketRound4, winnerBracketRound5And6Container, lowerBracketPlayer, lowerBracketFinalsPlayer]

let winnerBracketRound1Lines = document.getElementById("winnerBracketRound1Lines")
let winnerBracketRound2Lines = document.getElementById("winnerBracketRound2Lines")
let winnerBracketRound3Lines = document.getElementById("winnerBracketRound3Lines")
let winnerBracketRound4Lines = document.getElementById("winnerBracketRound4Lines")
let winnerBracketRound5Lines = document.getElementById("winnerBracketRound5Lines")
let lowerBracketRound1Lines = document.getElementById("lowerBracketRound1Lines")
let lowerBracketRound2Lines = document.getElementById("lowerBracketRound2Lines")
let lowerBracketRound3Lines = document.getElementById("lowerBracketRound3Lines")
let lowerBracketRound4Lines = document.getElementById("lowerBracketRound4Lines")
let lowerBracketRound5Lines = document.getElementById("lowerBracketRound5Lines")


const resetBracket = function() {
    // Clear Each Tile
    for (let i = 0; i < playerTiles.length; i++) {
        for (let j = 0; j < playerTiles[i].length; j++) {
            playerTiles[i][j].style.backgroundColor = "var(--borderGray)"
            playerTiles[i][j].children[1].style.backgroundColor = "var(--elementGray)"
            playerTiles[i][j].children[1].style.color = "white"
            playerTiles[i][j].children[1].innerText = ""
            playerTiles[i][j].children[2].style.backgroundColor = "var(--elementGray)"
            playerTiles[i][j].children[2].style.backgroundImage = "none"
            playerTiles[i][j].children[2].innerHTML = ""
            playerTiles[i][j].children[3].style.color = "var(--textGray)"
            playerTiles[i][j].children[3].innerText = "PLAYER"
            playerTiles[i][j].children[4].style.backgroundColor = "var(--elementGray)"
            playerTiles[i][j].children[4].style.backgroundImage = "none"
            playerTiles[i][j].children[4].innerHTML = ""
        }
    }

    // Clear Lines
    // Winner Bracket Round 1
    for (let i = 0; i < winnerBracketRound1Lines.childElementCount; i++) {
        let currentSVG = winnerBracketRound1Lines.children[i]
        currentSVG.innerHTML = ""
        currentSVG.innerHTML += '<line x1="0" x2="32" y1="21" y2="21" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="31" x2="31" y1="21" y2="49" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="31" x2="61" y1="48" y2="48" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="0" x2="32" y1="76" y2="76" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="31" x2="31" y1="48" y2="76" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        if (i % 2 == 0) {
            currentSVG.innerHTML += '<line x1="61" x2="61" y1="48" y2="76" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="61" x2="95" y1="76" y2="76" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        } else {
            currentSVG.innerHTML += '<line x1="61" x2="61" y1="48" y2="21" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="61" x2="95" y1="21" y2="21" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        }
    }
    // Winner Bracket Round 2
    for (let i = 0; i < winnerBracketRound2Lines.childElementCount; i++) {
        let currentSVG = winnerBracketRound2Lines.children[i]
        currentSVG.innerHTML = ""
        switch (i) {
            case 0: {
                currentSVG.innerHTML += '<line x1="0" x2="33" y1="26" y2="26" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="32" y1="26" y2="62" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="66" y1="62" y2="62" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="65" x2="65" y1="62" y2="157" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="65" x2="100" y1="156" y2="156" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="0" x2="33" y1="97" y2="97" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML +='<line x1="32" x2="32" y1="97" y2="62" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                break
            }
            case 1: {
                currentSVG.innerHTML += '<line x1="0" x2="33" y1="61" y2="61" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="32" y1="61" y2="97" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="66" y1="97" y2="97" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="65" x2="65" y1="97" y2="7" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="65" x2="100" y1="7" y2="7" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="0" x2="33" y1="132" y2="132" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="32" y1="132" y2="97" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                break
            }
            case 2: {
                currentSVG.innerHTML += '<line x1="0" x2="33" y1="168.25" y2="168.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="32" y1="168.25" y2="132.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="66" y1="132.25" y2="132.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="65" x2="65" y1="132.25" y2="222.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="65" x2="100" y1="222.25" y2="222.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="0" x2="33" y1="97.25" y2="97.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="32" y1="97.25" y2="132.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                break
            } 
            case 3: {
                currentSVG.innerHTML += '<line x1="0" x2="33" y1="132.25" y2="132.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="32" y1="132.25" y2="167.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="66" y1="167.25" y2="167.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="65" x2="65" y1="167.25" y2="72.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="65" x2="100" y1="73.25" y2="73.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="0" x2="33" y1="203.25" y2="203.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                currentSVG.innerHTML += '<line x1="32" x2="32" y1="203.25" y2="167.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                break
            }
        }
    }
    // Winner Bracket Round 3
    let winnerBracketRound3UpperSide = winnerBracketRound3Lines.children[0]
    winnerBracketRound3UpperSide.innerHTML = ""
    winnerBracketRound3UpperSide.innerHTML += '<line x1="0" x2="33" y1="29" y2="29" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3UpperSide.innerHTML += '<line x1="32" x2="32" y1="29" y2="69" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3UpperSide.innerHTML += '<line x1="32" x2="66" y1="69" y2="69" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3UpperSide.innerHTML += '<line x1="65" x2="65" y1="69" y2="289" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3UpperSide.innerHTML += '<line x1="65" x2="100" y1="288" y2="288" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3UpperSide.innerHTML += '<line x1="0" x2="33" y1="109" y2="109" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3UpperSide.innerHTML += '<line x1="32" x2="32" y1="109" y2="69" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    let winnerBracketRound3LowerSide = winnerBracketRound3Lines.children[1]
    winnerBracketRound3LowerSide.innerHTML = ""
    winnerBracketRound3LowerSide.innerHTML += '<line x1="0" x2="33" y1="303" y2="303" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="32" x2="32" y1="303" y2="263" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="32" x2="66" y1="263" y2="263" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="65" x2="65" y1="263" y2="45" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="65" x2="100" y1="46" y2="46" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="0" x2="33" y1="223" y2="223" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="32" x2="32" y1="223" y2="263" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    // Winner Bracket Round 4
    let winnerBracketRound4ResetLines = winnerBracketRound4Lines.children[0]
    winnerBracketRound4ResetLines.innerHTML = ""
    winnerBracketRound4ResetLines.innerHTML += '<line x1="0" x2="20" y1="31" y2="31" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="20" x2="20" y1="73.5" y2="31" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="20" x2="68" y1="73.5" y2="73.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="67" x2="67" y1="73.5" y2="30" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="67" x2="67" y1="92.25" y2="117" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="0" x2="20" y1="116" y2="116" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="20" x2="20" y1="116" y2="73.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    // Winner Bracket Round 5
    let winnerBracketRound5ResetLines = winnerBracketRound5Lines.children[0]
    winnerBracketRound5ResetLines.innerHTML = ""
    winnerBracketRound5ResetLines.innerHTML += '<line x1="0" x2="100" y1="63" y2="63" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound5ResetLines.innerHTML += '<line x1="100" x2="100" y1="63" y2="0" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    // Lower Bracket Round 1
    for (let i = 0; i < lowerBracketRound1Lines.childElementCount; i++) {
        let currentSVG = lowerBracketRound1Lines.children[i]
        currentSVG.innerHTML = ""
        currentSVG.innerHTML += '<line x1="0" y1="25.5" x2="23" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="22" y1="24.5" x2="22" y2="60" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="21" y1="59" x2="44" y2="59" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="22" y1="94.5" x2="22" y2="60" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="0" y1="94.5" x2="23" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    }
    // Lower Bracket Round 2
    for (let i = 0; i < lowerBracketRound2Lines.childElementCount; i++) {
        let currentSVG = lowerBracketRound2Lines.children[i]
        currentSVG.innerHTML = ""
        if (i % 2 == 0) {
            currentSVG.innerHTML += '<line x1="0" y1="25.5" x2="13" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="12" y1="24.5" x2="12" y2="60" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="12" y1="59" x2="24" y2="59" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="24" y1="58" x2="24" y2="111" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="24" y1="110" x2="40" y2="110" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="12" y1="94.5" x2="12" y2="60" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="0" y1="94.5" x2="13" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        } else {
            currentSVG.innerHTML += '<line x1="0" y1="25.5" x2="13" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="12" y1="24.5" x2="12" y2="60" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="12" y1="59" x2="24" y2="59" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="24" y1="59" x2="24" y2="16" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="24" y1="17" x2="40" y2="17" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="12" y1="94.5" x2="12" y2="59" stroke="rgb(102,102,102)" stroke-width="3"></line>'
            currentSVG.innerHTML += '<line x1="0" y1="94.5" x2="13" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        }
    }
    // Loser Bracket Round 3
    for (let i = 0; i < lowerBracketRound3Lines.childElementCount; i++) {
        let currentSVG = lowerBracketRound3Lines.children[i]
        currentSVG.innerHTML = ""
        currentSVG.innerHTML += '<line x1="0" y1="25.5" x2="23" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="22" y1="24.5" x2="22" y2="95.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="21" y1="59" x2="44" y2="59" stroke="rgb(102,102,102)" stroke-width="3"></line>'
        currentSVG.innerHTML += '<line x1="0" y1="94.5" x2="23" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    }
    // Lower Bracket Round 4
    let lowerBracketRound4ResetUpperLines = lowerBracketRound4Lines.children[0]
    lowerBracketRound4ResetUpperLines.innerHTML = ""
    lowerBracketRound4ResetUpperLines.innerHTML += '<line x1="0" y1="25.5" x2="15" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetUpperLines.innerHTML += '<line x1="14" y1="24.5" x2="14" y2="60" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetUpperLines.innerHTML += '<line x1="14" y1="59" x2="29" y2="59" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetUpperLines.innerHTML += '<line x1="29" y1="58" x2="29" y2="183" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetUpperLines.innerHTML += '<line x1="28" y1="182" x2="44" y2="182" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetUpperLines.innerHTML += '<line x1="14" y1="94.5" x2="14" y2="60" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetUpperLines.innerHTML += '<line x1="0" y1="94.5" x2="15" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    let lowerBracketRound4ResetLowerLines = lowerBracketRound4Lines.children[1]
    lowerBracketRound4ResetLowerLines.innerHTML = ""
    lowerBracketRound4ResetLowerLines.innerHTML += '<line x1="0" y1="194.5" x2="15" y2="194.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetLowerLines.innerHTML += '<line x1="14" y1="195.5" x2="14" y2="160" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetLowerLines.innerHTML += '<line x1="14" y1="160" x2="29" y2="160" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetLowerLines.innerHTML += '<line x1="28" y1="160" x2="28" y2="31" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetLowerLines.innerHTML += '<line x1="27" y1="32" x2="44" y2="32" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetLowerLines.innerHTML += '<line x1="14" y1="125.5" x2="14" y2="160" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound4ResetLowerLines.innerHTML += '<line x1="0" y1="125.5" x2="15" y2="125.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    // Lower Bracket Round 5
    let lowerBracketRound5ResetLines = lowerBracketRound5Lines.children[0]
    lowerBracketRound5ResetLines.innerHTML = ""
    lowerBracketRound5ResetLines.innerHTML += '<line x1="0" y1="25.5" x2="23" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound5ResetLines.innerHTML += '<line x1="22" y1="24.5" x2="22" y2="60" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound5ResetLines.innerHTML += '<line x1="21" y1="59" x2="70" y2="59" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound5ResetLines.innerHTML += '<line x1="69" y1="58" x2="69" y2="95.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound5ResetLines.innerHTML += '<line x1="22" y1="94.5" x2="22" y2="60" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    lowerBracketRound5ResetLines.innerHTML += '<line x1="0" y1="94.5" x2="23" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
}

resetBracket()