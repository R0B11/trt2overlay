// Connecting to server
let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws")
socket.onopen = () => console.log("Successfully Connected")
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event)
    socket.send("Client Closed!")
};
socket.onerror = error => console.log("Socket Error: ", error)

// Now Playing Section
let nowPlayingSongArtist = $("#nowPlayingSongArtist")
let nowPlayingArtist
let nowPlayingSong

socket.onmessage = event => {
    let data = JSON.parse(event.data)
    if (nowPlayingArtist != data.menu.bm.metadata.artist || nowPlayingSong != data.menu.bm.metadata.title) {
        nowPlayingArtist = data.menu.bm.metadata.artist
        nowPlayingSong = data.menu.bm.metadata.title
        nowPlayingSongArtist.text(`${nowPlayingArtist} - ${nowPlayingSong}`)
    }
}