// Connecting to server
let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws")
socket.onopen = () => console.log("Successfully Connected")
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
    socket.send("Client Closed!")
};
socket.onerror = error => console.log("Socket Error: ", error)

// Cookie Changes
let winnerProfilePicture = $("#winnerProfilePicture") // Winner Profile Picture
let roundName = $("#roundName") // Round name
let winnerName = $("#winnerName") // Winner name

// Now Playing
let nowPlayingSongArtist = $("#nowPlayingSongArtist")
let currentSongName
let currentArtistName

// Cookie Setting for win screen
window.setInterval(() => {
    let cookieName = "winscreenWinnerID"
    // Code taken from 3WC
    // Profile Picture
    let match = document.cookie.match(`(?:^|.*)${cookieName}=(.+?)(?:$|[|;].*)`)
    if (match) winnerProfilePicture.attr("src",`https://a.ppy.sh/${match[1]}`)
    // Round Name
    cookieName = "winscreenRoundName"
    match = document.cookie.match(`(?:^|.*)${cookieName}=(.+?)(?:$|[|;].*)`)
    if (match) roundName.text(match[1])
    // Winner Name
    cookieName = "winscreenWinnerName"
    match = document.cookie.match(`(?:^|.*)${cookieName}=(.+?)(?:$|[|;].*)`)
    if (match) winnerName.text(match[1])
}, 500)

socket.onmessage = event => {
    let data = JSON.parse(event.data)
    console.log(data)

    if (currentSongName != data.menu.bm.metadata.title || currentArtistName != data.menu.bm.metadata.artist) {
        currentSongName = data.menu.bm.metadata.title
        currentArtistName = data.menu.bm.metadata.artist
        nowPlayingSongArtist.text(`${currentArtistName.toUpperCase()} - ${currentSongName.toUpperCase()}`)
    }
}