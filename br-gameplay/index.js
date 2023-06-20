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
let currentBaseAR // Done
let currentBaseOD // Done
let currentBaseCS // Done
let currentBaseBPM
let currentAR // Done
let currentOD // Done
let currentSR
let currentCS // Done
let currentBPM
let currentMapMod = ""

// Map Details
let currentSongArtistAndName = $("#currentSongArtistAndName")
let currentMapDifficulty = $("#currentMapDifficulty")
let currentMapSetCreator = $("currentMapSetCreator")
let currentSongArtist
let currentSongName
let currentSongDifficulty
let currentSongCreator
let currentSongID
let poolMapFound = false

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
                currentBaseAR = ""
                currentBaseOD = ""
                currentBaseCS = ""
                currentBaseBPM = ""
                currentMapMod = "" // Enter data here
                mapModSlot.css("display","block")
            } else {
                currentMapMod = ""
                mapModSlot.css("display","none")
            }
        }
        SRRequest.send()
    }
    // SR
    if (!poolMapFound && currentSR != data.menu.bm.stats.SR) {
        currentSR = data.menu.bm.stats.SR
        animation.SRStat.update(currentSR)
    }
    // AR
    if (!poolMapFound && currentBaseAR != data.menu.bm.stats.AR) {
        currentBaseAR = data.menu.bm.stats.AR
        currentAR = calculateARandOD(currentBaseAR, currentMapMod)   

        animation.mapStatNumberAR.update(currentAR)
    }
    // OD
    if (!poolMapFound && currentBaseOD != data.menu.bm.stats.OD) {
        currentBaseOD = data.menu.bm.stats.OD
        currentOD = calculateARandOD(currentBaseOD, currentMapMod)   

        animation.mapStatNumberOD.update(currentOD)
    }
    // CS
    if (!poolMapFound && currentBaseCS != data.menu.bm.stats.CS) {
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
}