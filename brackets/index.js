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
let matchObjects

socket.onmessage = event => {
    let data = JSON.parse(event.data)

    if (currentSongName != data.menu.bm.metadata.title || currentArtistName != data.menu.bm.metadata.artist) {
        currentSongName = data.menu.bm.metadata.title
        currentArtistName = data.menu.bm.metadata.artist
        nowPlayingSongArtist.text(`${currentArtistName.toUpperCase()} - ${currentSongName.toUpperCase()}`)
    }
}

let baseAddress = "http://localhost:5280"

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
    winnerBracketRound3LowerSide.innerHTML += '<line x1="32" x2="66" y1="263" y2="263" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="65" x2="65" y1="263" y2="45" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="65" x2="100" y1="46" y2="46" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="0" x2="33" y1="223" y2="223" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="32" x2="32" y1="223" y2="263" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="0" x2="33" y1="303" y2="303" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound3LowerSide.innerHTML += '<line x1="32" x2="32" y1="303" y2="263" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    // Winner Bracket Round 4
    let winnerBracketRound4ResetLines = winnerBracketRound4Lines.children[0]
    winnerBracketRound4ResetLines.innerHTML = ""
    winnerBracketRound4ResetLines.innerHTML += '<line x1="0" x2="20" y1="31" y2="31" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="20" x2="20" y1="73.5" y2="31" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="20" x2="68" y1="73.5" y2="73.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="67" x2="67" y1="73.5" y2="30" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="0" x2="20" y1="116" y2="116" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    winnerBracketRound4ResetLines.innerHTML += '<line x1="20" x2="20" y1="116" y2="73.5" stroke="rgb(102,102,102)" stroke-width="3"></line>'
    // Winner Bracket Round 5
    let winnerBracketRound5ResetLines = winnerBracketRound5Lines.children[0]
    winnerBracketRound5ResetLines.innerHTML = ""
    winnerBracketRound5ResetLines.innerHTML += '<line x1="1" x2="1" y1="84" y2="63" stroke="rgb(102,102,102)" stroke-width="3"></line>'
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
    // Lower Bracket Round 3
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

const AUFlagURL = "static/flags/AU.png"
const CAFlagURl = "static/flags/CA.png"
const CNFlagURL = "static/flags/CN.png"
const HKFlagURL = "static/flags/HK.png"
const PLFlagURL = "static/flags/PL.png"
const KRFlagURL = "static/flags/KR.png"
const UKFlagURL = "static/flags/UK.png"
const USFlagURL = "static/flags/US.png"

const playerArray = [
    {playerID: "12408961", playerName: "maliszewski", playerFlag: PLFlagURL},
    {playerID: "4945688", playerName: "rairiku", playerFlag: AUFlagURL},
    {playerID: "2558286", playerName: "Rafis", playerFlag: PLFlagURL},
    {playerID: "7813296", playerName: "Rektygon", playerFlag: USFlagURL},
    {playerID: "6114695", playerName: "Ciru", playerFlag: USFlagURL},
    {playerID: "4733121", playerName: "Kariyu", playerFlag: USFlagURL},
    {playerID: "5791401", playerName: "lolol234", playerFlag: CNFlagURL}, 
    {playerID: "4175698", playerName: "Sytho", playerFlag: USFlagURL},
    {playerID: "4908650", playerName: "im a fancy lad", playerFlag: USFlagURL}, 
    {playerID: "7562902", playerName: "mrekk", playerFlag: AUFlagURL},
    {playerID: "9501251", playerName: "ChillierPear", playerFlag: USFlagURL}, 
    {playerID: "3717598", playerName: "xootynator", playerFlag: CAFlagURl},
    {playerID: "6304246", playerName: "RyuK", playerFlag: CAFlagURl},
    {playerID: "5033077", playerName: "Zylice", playerFlag: CAFlagURl},
    {playerID: "9224078", playerName: "FlyingTuna", playerFlag: KRFlagURL},
    {playerID: "5182050", playerName: "Bubbleman", playerFlag: UKFlagURL}
]

// Player Table workaround
let playerObjects
let playersRequest = new XMLHttpRequest()
async function sendPlayerRequest() {
    playersRequest.open("GET", `${baseAddress}/api/players/all`)
    playersRequest.onload = function() {
        if (this.status == 404) return
        if (this.status == 200) playerObjects = JSON.parse(this.responseText)
    }
    await playersRequest.send()
}
sendPlayerRequest()

const pullResultsFromDatabase = async () => {
    resetBracket()
    
    // Pull Matches from API
    async function sendMatchRequest() {
        let matchesRequest = new XMLHttpRequest()
        matchesRequest.open("GET", `${baseAddress}/api/matches/all`, false)
        matchesRequest.onload = function() {
            if (this.status >= 400) return
            if (this.status == 200) matchObjects = JSON.parse(this.responseText)
        }
        await matchesRequest.send()
    }
    await sendMatchRequest()

    matchObjects.sort((a,b) => a.match.bracketMatchId - b.match.bracketMatchId)

    for (let i = 0; i < matchObjects.length; i++)  {

        let bracketMatchID = matchObjects[i].match.bracketMatchId
        let currentMatch = document.getElementById(`match${bracketMatchID}`)

        // Players Table workaround
        let player1 = ""
        let player2 = ""
        let player1ID
        let player2ID
        let player1osuID
        let player2osuID

        // Conditions
        if (matchObjects[i].matchPlayers.length != 2) continue
        let playerEmpty = false
        for (let j = 0; j < matchObjects[i].matchPlayers.length; j++) if (!matchObjects[i].matchPlayers[j].playerId) playerEmpty = true
        if (playerEmpty) continue

        for (let j = 0; j < playerObjects.length; j++) {
            if (matchObjects[i].matchPlayers[0].playerId == playerObjects[j].id) {
                player1 = currentMatch.children[0]
                player1ID = playerObjects[j].id
                player1osuID = playerObjects[j].osuPlayerId
            } else if (matchObjects[i].matchPlayers[1].playerId == playerObjects[j].id) {
              player2 = currentMatch.children[1]
              player2ID = playerObjects[j].id
              player2osuID = playerObjects[j].osuPlayerId
            }
        }

        let linesMatch = document.getElementById(`linesMatch${bracketMatchID}`)
        
        // Enter in details for match        
        for (let j = 0; j < playerArray.length; j++) {
            if (playerArray[j].playerID == player1osuID) {

                // Write Player Names
                player1.children[3].innerText = playerArray[j].playerName.toUpperCase()
                player1.children[3].style.color = "white"
                // Write Player Score
                player1.children[1].innerText = matchObjects[i].matchPlayers[0].score
                player1.children[1].style.color = "white"
                // Write Player Flag
                player1.children[2].style.backgroundImage = `url("${playerArray[j].playerFlag}")`
                // Write Player Profile Picture
                player1.children[4].style.backgroundImage = `url("https://a.ppy.sh/${playerArray[j].playerID}")`

            } else if (playerArray[j].playerID == player2osuID) {

                // Write Player Names
                player2.children[3].innerText = playerArray[j].playerName.toUpperCase()
                player2.children[3].style.color = "white"
                // Write Player Score
                player2.children[1].innerText = matchObjects[i].matchPlayers[1].score
                player2.children[1].style.color = "white"
                // Write Player Flag
                player2.children[2].style.backgroundImage = `url("${playerArray[j].playerFlag}")`
                // Write Player Profile Picture
                player2.children[4].style.backgroundImage = `url("https://a.ppy.sh/${playerArray[j].playerID}")`

            }
        }

        // Enter in winner
        let winnerID = matchObjects[i].match.winnerId;

        let playerWin = false
        let player1Win = false
        let player2Win = false
        let winnerPlayerElement
        let loserPlayerElement

        // Style winners
        if (winnerID == player1ID) {
            playerWin = true
            player1Win = true
            winnerPlayerElement = player1
            loserPlayerElement = player2

            player1.style.backgroundColor = "var(--borderRed)"
            player1.children[1].style.backgroundColor = "var(--borderRed)"
            player1.children[3].style.color = "var(--textAndLineGold)"

            player2.children[1].style.color = "var(--textGray)"
            player2.children[2].innerHTML = "<div class='flagAndProfilePictureOverlay'></div>"
            player2.children[3].style.color = "var(--textGray)"
            player2.children[4].innerHTML = "<div class='flagAndProfilePictureOverlay'></div>"
        } else if (winnerID == player2ID) {
            playerWin = true
            player2Win = true
            winnerPlayerElement = player2
            loserPlayerElement = player1

            player2.style.backgroundColor = "var(--borderRed)"
            player2.children[1].style.backgroundColor = "var(--borderRed)"
            player2.children[3].style.color = "var(--textAndLineGold)"

            player1.children[1].style.color = "var(--textGray)"
            player1.children[2].innerHTML = "<div class='flagAndProfilePictureOverlay'></div>"
            player1.children[3].style.color = "var(--textGray)"
            player1.children[4].innerHTML = "<div class='flagAndProfilePictureOverlay'></div>"
        }
        // Draw Lines and set names on new tiles
        if (player1Win && bracketMatchID == 30) return
        if (playerWin) {
            if (currentMatch.hasAttribute("winnerTo")) {
                let winnerMatch = document.getElementById(currentMatch.getAttribute("winnerTo"))
                winnerMatch.children[1].innerText = 0
                winnerMatch.children[2].innerHTML = ""
                winnerMatch.children[2].style.backgroundImage = getComputedStyle(winnerPlayerElement.children[2]).getPropertyValue("background-image")
                winnerMatch.children[3].style.color = "white"
                winnerMatch.children[3].innerText = winnerPlayerElement.children[3].innerText
                winnerMatch.children[4].innerHTML = ""
                winnerMatch.children[4].style.backgroundImage = getComputedStyle(winnerPlayerElement.children[4]).getPropertyValue("background-image")
            }
            
            if (currentMatch.hasAttribute("loserTo")) {
                let loserMatch = document.getElementById(currentMatch.getAttribute("loserTo"))
                loserMatch.children[1].innerText = 0
                loserMatch.children[2].innerHTML = ""
                loserMatch.children[2].style.backgroundImage = getComputedStyle(loserPlayerElement.children[2]).getPropertyValue("background-image")
                loserMatch.children[3].style.color = "white"
                loserMatch.children[3].innerText = loserPlayerElement.children[3].innerText
                loserMatch.children[4].innerHTML = ""
                loserMatch.children[4].style.backgroundImage = getComputedStyle(loserPlayerElement.children[4]).getPropertyValue("background-image")   
            }
        }

        // TODO: Refactor for checking winner first, and then potentially checking who won and having it in a single line.
        if (bracketMatchID <= 8) {
            if (playerWin) linesMatch.innerHTML = `<line x1="31" x2="61" y1="48" y2="48" stroke="rgb(255,226,146)" stroke-width="3"></line>`
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="32" y1="21" y2="21" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="31" x2="31" y1="21" y2="49" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" x2="32" y1="76" y2="76" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="31" x2="31" y1="60" y2="76" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="32" y1="21" y2="21" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="31" x2="31" y1="21" y2="37" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" x2="32" y1="76" y2="76" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="31" x2="31" y1="48" y2="76" stroke="rgb(255,226,146)" stroke-width="3"></line>>
                `
            }
          
            if (playerWin && bracketMatchID % 2 == 0) {
                linesMatch.innerHTML += `
                <line x1="61" x2="61" y1="48" y2="21" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="61" x2="95" y1="21" y2="21" stroke="rgb(255,226,146)" stroke-width="3"></line
                `
            } else if (playerWin) {
                linesMatch.innerHTML += `
                <line x1="61" x2="61" y1="48" y2="76" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="61" x2="95" y1="76" y2="76" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID <= 12) {
            if (playerWin) linesMatch.innerHTML = '<line x1="21" y1="59" x2="44" y2="59" stroke="rgb(255,226,146)" stroke-width="3"></line>'
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" y1="25.5" x2="23" y2="25.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="22" y1="24.5" x2="22" y2="60" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="22" y1="94.5" x2="22" y2="73" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" y1="94.5" x2="23" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" y1="25.5" x2="23" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="22" y1="24.5" x2="22" y2="47" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="22" y1="94.5" x2="22" y2="59" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" y1="94.5" x2="23" y2="94.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 13) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="32" x2="66" y1="62" y2="62" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="65" x2="65" y1="62" y2="157" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="65" x2="100" y1="156" y2="156" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="26" y2="26" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="26" y2="62" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" x2="33" y1="97" y2="97" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="97" y2="75" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="26" y2="26" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="26" y2="49" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" x2="33" y1="97" y2="97" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="97" y2="62" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 14) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="32" x2="66" y1="97" y2="97" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                <line x1="65" x2="65" y1="97" y2="7" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                <line x1="65" x2="100" y1="7" y2="7" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                `
            }
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="61" y2="61" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="61" y2="97" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" x2="33" y1="132" y2="132" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="132" y2="110" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="61" y2="61" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="61" y2="84" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" x2="33" y1="132" y2="132" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="132" y2="97" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 15) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="32" x2="66" y1="132.25" y2="132.25" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="65" x2="65" y1="132.25" y2="222.25" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="65" x2="100" y1="222.25" y2="222.25" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="97.25" y2="97.25" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="97.25" y2="132.25" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" x2="33" y1="168.25" y2="168.25" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="168.25" y2="145.25" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="97.25" y2="97.25" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="97.25" y2="119.25" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" x2="33" y1="168.25" y2="168.25" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="168.25" y2="132.25" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 16) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="32" x2="66" y1="167.25" y2="167.25" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                <line x1="65" x2="65" y1="167.25" y2="72.25" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                <line x1="65" x2="100" y1="73.25" y2="73.25" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                `
            }
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="132.25" y2="132.25" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                <line x1="32" x2="32" y1="132.25" y2="167.25" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                <line x1="0" x2="33" y1="203.25" y2="203.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                <line x1="32" x2="32" y1="203.25" y2="180.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="132.25" y2="132.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                <line x1="32" x2="32" y1="132.25" y2="154.25" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                <line x1="0" x2="33" y1="203.25" y2="203.25" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                <line x1="32" x2="32" y1="203.25" y2="167.25" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                `
            }
        } else if (bracketMatchID <= 20) {
            if (playerWin) {
                linesMatch.innerHTML = `<line x1="12" y1="59" x2="24" y2="59" stroke="rgb(255,226,146)" stroke-width="3"></line>`
                if (bracketMatchID % 2 == 0) {
                    linesMatch.innerHTML += `
                    <line x1="24" y1="58" x2="24" y2="111" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    <line x1="24" y1="110" x2="40" y2="110" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    `
                } else {
                    linesMatch.innerHTML += `
                    <line x1="24" y1="59" x2="24" y2="16" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    <line x1="24" y1="17" x2="40" y2="17" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    `
                }

                if (player1Win) {
                    linesMatch.innerHTML += `
                    <line x1="0" y1="25.5" x2="13" y2="25.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    <line x1="12" y1="24.5" x2="12" y2="60" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    <line x1="12" y1="94.5" x2="12" y2="73" stroke="rgb(102,102,102)" stroke-width="3"></line>
                    <line x1="0" y1="94.5" x2="13" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                    `
                } else if (player2Win) {
                    linesMatch.innerHTML += `
                    <line x1="0" y1="25.5" x2="13" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                    <line x1="12" y1="24.5" x2="12" y2="47" stroke="rgb(102,102,102)" stroke-width="3"></line>
                    <line x1="12" y1="94.5" x2="12" y2="60" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    <line x1="0" y1="94.5" x2="13" y2="94.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    `
                }
            }
        } else if (bracketMatchID <= 22) {
            if (player1Win) {
                linesMatch.innerHTML = `
                    <line x1="0" y1="25.5" x2="23" y2="25.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    <line x1="22" y1="24.5" x2="22" y2="60" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    <line x1="21" y1="59" x2="44" y2="59" stroke="rgb(255,226,146)" stroke-width="3"></line>
                    <line x1="22" y1="94.5" x2="22" y2="73" stroke="rgb(102,102,102)" stroke-width="3"></line>
                    <line x1="0" y1="94.5" x2="23" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML = `
                <line x1="0" y1="25.5" x2="23" y2="25.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="22" y1="24.5" x2="22" y2="47" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="21" y1="59" x2="44" y2="59" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="22" y1="94.5" x2="22" y2="60" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" y1="94.5" x2="23" y2="94.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 23) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="32" x2="66" y1="69" y2="69" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="65" x2="65" y1="69" y2="289" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="65" x2="100" y1="288" y2="288" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
            if (player1Win) {
                linesMatch.innerHTML += `
                '<line x1="0" x2="33" y1="29" y2="29" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                '<line x1="32" x2="32" y1="29" y2="69" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                '<line x1="0" x2="33" y1="109" y2="109" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                '<line x1="32" x2="32" y1="109" y2="82" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                '<line x1="0" x2="33" y1="29" y2="29" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                '<line x1="32" x2="32" y1="29" y2="56" stroke="rgb(102,102,102)" stroke-width="3"></line>'
                '<line x1="0" x2="33" y1="109" y2="109" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                '<line x1="32" x2="32" y1="109" y2="69" stroke="rgb(255,226,146)" stroke-width="3"></line>'
                `
            }
        } else if (bracketMatchID == 24) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="32" x2="66" y1="263" y2="263" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="65" x2="65" y1="263" y2="45" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="65" x2="100" y1="46" y2="46" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }

            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="223" y2="223" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="223" y2="263" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" x2="33" y1="303" y2="303" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="303" y2="276" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="33" y1="223" y2="223" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="223" y2="250" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" x2="33" y1="303" y2="303" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="32" x2="32" y1="303" y2="263" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 25) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="14" y1="59" x2="29" y2="59" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="29" y1="58" x2="29" y2="183" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="28" y1="182" x2="44" y2="182" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" y1="25.5" x2="15" y2="25.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="14" y1="24.5" x2="14" y2="60" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="14" y1="94.5" x2="14" y2="73" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" y1="94.5" x2="15" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" y1="25.5" x2="15" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="14" y1="24.5" x2="14" y2="47" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="14" y1="94.5" x2="14" y2="60" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" y1="94.5" x2="15" y2="94.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 26) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="14" y1="160" x2="29" y2="160" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="28" y1="160" x2="28" y2="31" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="27" y1="32" x2="44" y2="32" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="14" y1="125.5" x2="14" y2="160" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" y1="125.5" x2="15" y2="125.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" y1="194.5" x2="15" y2="194.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="14" y1="195.5" x2="14" y2="173" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="14" y1="125.5" x2="14" y2="147" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" y1="125.5" x2="15" y2="125.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" y1="194.5" x2="15" y2="194.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="14" y1="195.5" x2="14" y2="160" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 27) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="21" y1="59" x2="70" y2="59" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="69" y1="58" x2="69" y2="95.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" y1="25.5" x2="23" y2="25.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="22" y1="24.5" x2="22" y2="60" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="22" y1="94.5" x2="22" y2="73" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" y1="94.5" x2="23" y2="94.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" y1="25.5" x2="23" y2="25.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="22" y1="24.5" x2="22" y2="47" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="22" y1="94.5" x2="22" y2="60" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" y1="94.5" x2="23" y2="94.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 28) {
            if (playerWin) {
                linesMatch.innerHTML = `
                <line x1="20" x2="68" y1="73.5" y2="73.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="67" x2="67" y1="73.5" y2="30" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
            if (player1Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="20" y1="31" y2="31" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="20" x2="20" y1="73.5" y2="31" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" x2="20" y1="116" y2="116" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="20" x2="20" y1="116" y2="86.5" stroke="rgb(102,102,102)" stroke-width="3"></line>
                `
            } else if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="0" x2="20" y1="31" y2="31" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="20" x2="20" y1="60.5" y2="31" stroke="rgb(102,102,102)" stroke-width="3"></line>
                <line x1="0" x2="20" y1="116" y2="116" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="20" x2="20" y1="116" y2="73.5" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        } else if (bracketMatchID == 30) {
            if (player2Win) {
                linesMatch.innerHTML += `
                <line x1="1" x2="1" y1="84" y2="63" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="0" x2="100" y1="63" y2="63" stroke="rgb(255,226,146)" stroke-width="3"></line>
                <line x1="100" x2="100" y1="63" y2="0" stroke="rgb(255,226,146)" stroke-width="3"></line>
                `
            }
        }
    }
}