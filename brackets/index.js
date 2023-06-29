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
const pullResultsFromDatabase = () => {

}