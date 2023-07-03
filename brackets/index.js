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
}
