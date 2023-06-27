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

// Control Panel
let controlPanelLeftSideSelect = $("#controlPanelLeftSideSelect")
let controlPanelLeftRightControlButton = $("#controlPanelLeftRightControlButton")
let controlPanelLeftRightControl = $("#controlPanelLeftRightControl")
let controlPanelMiddleControl = $("#controlPanelMiddleControl")
let controlPanelLeftRightControlCheckboxes = document.getElementById("controlPanelLeftRightControlCheckboxes")

let previousPlayersLeft = []
let previousPlayersRight = []
let currentPlayersLeft = []
let currentPlayersRight = []

// Player Controls
let playersLeft = document.getElementById("playersLeft")
let playersRight = document.getElementById("playersRight")
let messageBox = $("#messageBox")
let messageBoxLeftText = ""
let messageBoxRightText = ""

// SVGs
let leftLines = document.getElementById("leftLines")
let rightLines = document.getElementById("rightLines")

// Middle players
let leftMiddlePlayer = document.getElementById("leftMiddlePlayer")
let rightMiddlePlayer = document.getElementById("rightMiddlePlayer")

// Add event listeners
// Left Side
for (let i = 0; i < playersLeft.childElementCount; i++) {
    playersLeft.children[i].addEventListener("click", function() {
        // Reset everything
        for (let j = 0; j < playersLeft.childElementCount; j++) {
            playersLeft.children[j].style.backgroundColor = "var(--borderGray)"
            playersLeft.children[j].children[1].style.backgroundColor = "var(--elementGrayOverlay)"
            playersLeft.children[j].children[1].style.color = "var(--textGray)"
            if (playersLeft.children[j].children[2].childElementCount == 0) {
                let flagOverlay = document.createElement("div")
                flagOverlay.classList.add("flagOverlay")
                flagOverlay.classList.add("flagAndProfilePictureOverlay")
                playersLeft.children[j].children[2].append(flagOverlay)
            }
            playersLeft.children[j].children[3].style.color = "var(--textGray)"
            playersLeft.children[j].children[4].style.borderColor = "var(--borderGray)"
            if (playersLeft.children[j].children[4].childElementCount == 0) {
                let profileOverlay = document.createElement("div")
                profileOverlay.classList.add("flagAndProfilePictureOverlay")
                playersLeft.children[j].children[4].append(profileOverlay)
            }
        }
        // Add own elements
        this.style.backgroundColor = "var(--borderRed)"
        this.children[1].style.backgroundColor = "var(--borderRed)"
        this.children[1].style.color = "white";
        this.children[2].innerHTML = ""
        this.children[3].style.color = "var(--textGold)"
        this.children[4].innerHTML = ""
        this.children[4].style.borderColor = "var(--borderRed)"

        // SVG Lines
        // Get x number for left hand side
        leftLines.innerHTML = ""
        let currentNumber = parseInt(this.id.charAt(this.id.length - 1)) - 1
        let leftLineYPosition = 65 * currentNumber + 32.5 + (164 / 7 * currentNumber)
        // Create all elements
        let inLine = '<line x1="47.5" y1="342.5" x2="95" y2="342.5" stroke="rgba(255,226,146,1)" stroke-width="3"></line>'
        let outLine = `<line x1="0" y1="${leftLineYPosition}" x2="47.5" y2="${leftLineYPosition}" stroke="rgba(255,226,146,1)" stroke-width="3"></line>`
        let middleLine = `<line x1="47.5" y1="${leftLineYPosition}" x2="47.5" y2="342.5" stroke="rgba(255,226,146,1)" stroke-width="3"></line>`
        // Append all elements
        leftLines.innerHTML += inLine
        leftLines.innerHTML += outLine
        leftLines.innerHTML += middleLine

        // Set details for middle match
        let backgroundImageFlag = getComputedStyle(this.children[2]).backgroundImage
        let backgroundImageProfilePicture = getComputedStyle(this.children[4]).backgroundImage
        leftMiddlePlayer.children[1].style.color = "white"
        leftMiddlePlayer.children[1].innerText = this.children[1].innerText
        leftMiddlePlayer.children[2].style.backgroundImage = backgroundImageFlag
        leftMiddlePlayer.children[3].innerText = this.children[3].innerText
        leftMiddlePlayer.children[3].style.color = "white"
        leftMiddlePlayer.children[4].style.backgroundImage = backgroundImageProfilePicture
    })
}
// Right Side
for (let i = 0; i < playersRight.childElementCount; i++) {
    playersRight.children[i].addEventListener("click", function() {
        // Reset everything
        for (let j = 0; j < playersRight.childElementCount; j++) {
            playersRight.children[j].style.backgroundColor = "var(--borderGray)"
            playersRight.children[j].children[1].style.backgroundColor = "var(--elementGrayOverlay)"
            playersRight.children[j].children[1].style.color = "var(--textGray)"
            if (playersRight.children[j].children[2].childElementCount == 0) {
                let flagOverlay = document.createElement("div")
                flagOverlay.classList.add("flagOverlay")
                flagOverlay.classList.add("flagAndProfilePictureOverlay")
                playersRight.children[j].children[2].append(flagOverlay)
            }
            playersRight.children[j].children[3].style.color = "var(--textGray)"
            playersRight.children[j].children[4].style.borderColor = "var(--borderGray)"
            if (playersRight.children[j].children[4].childElementCount == 0) {
                let profileOverlay = document.createElement("div")
                profileOverlay.classList.add("flagAndProfilePictureOverlay")
                playersRight.children[j].children[4].append(profileOverlay)
            }
        }
        // Add own elements
        this.style.backgroundColor = "var(--borderRed)"
        this.children[1].style.backgroundColor = "var(--borderRed)"
        this.children[1].style.color = "white";
        this.children[2].innerHTML = ""
        this.children[3].style.color = "var(--textGold)"
        this.children[4].innerHTML = ""
        this.children[4].style.borderColor = "var(--borderRed)"

        // SVG Lines
        // Get x number for left hand side
        rightLines.innerHTML = ""
        let currentNumber = parseInt(this.id.charAt(this.id.length - 1)) - 1
        let leftLineYPosition = 65 * currentNumber + 32.5 + (164 / 7 * currentNumber)
        // Create all elements
        let inLine = '<line x1="0" y1="342.5" x2="47.5" y2="342.5" stroke="rgba(255,226,146,1)" stroke-width="3"></line>'
        let outLine = `<line x1="47.5" y1="${leftLineYPosition}" x2="95" y2="${leftLineYPosition}" stroke="rgba(255,226,146,1)" stroke-width="3"></line>`
        let middleLine = `<line x1="47.5" y1="${leftLineYPosition}" x2="47.5" y2="342.5" stroke="rgba(255,226,146,1)" stroke-width="3"></line>`
        // Append all elements
        rightLines.innerHTML += inLine
        rightLines.innerHTML += outLine
        rightLines.innerHTML += middleLine
        
        // Set details for middle match
        let backgroundImageFlag = getComputedStyle(this.children[2]).backgroundImage
        let backgroundImageProfilePicture = getComputedStyle(this.children[4]).backgroundImage
        rightMiddlePlayer.children[1].style.color = "white"
        rightMiddlePlayer.children[1].innerText = this.children[1].innerText
        rightMiddlePlayer.children[2].style.backgroundImage = backgroundImageFlag
        rightMiddlePlayer.children[3].innerText = this.children[3].innerText
        rightMiddlePlayer.children[3].style.color = "white"
        rightMiddlePlayer.children[4].style.backgroundImage = backgroundImageProfilePicture
    })
}

controlPanelLeftSideSelect.on("change", () => {
    let side = controlPanelLeftSideSelect.val()
    if (side == "middle") {
        controlPanelMiddleControl.css("display","block")
        controlPanelLeftRightControl.css("display","none")
    } else {
        controlPanelMiddleControl.css("display","none")
        controlPanelLeftRightControl.css("display","block")
        controlPanelLeftRightControlButton.attr("onclick",`controlPanelPlayerControlSides("${side}")`)
        
        // Reset all checked marks
        $("input:checkbox[name=player]").each(function() { $(this).prop("checked",false) });
        if (side == "left") {
            // Add left side back
            for (let i = 0; i < currentPlayersLeft.length; i++) {
                for (let j = 0; j < controlPanelLeftRightControlCheckboxes.childElementCount; j++) {
                    if (currentPlayersLeft[i].playerName == controlPanelLeftRightControlCheckboxes.children[j].innerText) {
                        controlPanelLeftRightControlCheckboxes.children[j].children[0].checked = true
                    }
                }
            }
            // Message Text
            messageBox.text(messageBoxLeftText)
            if (messageBoxLeftText == "You have currently selected more than 8 players!") messageBox.css("color","#FFCCCB")
            else if (messageBoxLeftText == "Success!") messageBox.css("color","green")

        } else {
            for (let i = 0; i < currentPlayersRight.length; i++) {
                for (let j = 0; j < controlPanelLeftRightControlCheckboxes.childElementCount; j++) {
                    if (currentPlayersRight[i].playerName == controlPanelLeftRightControlCheckboxes.children[j].innerText) {
                        controlPanelLeftRightControlCheckboxes.children[j].children[0].checked = true
                    }
                }
            }
            // Message Text
            messageBox.text(messageBoxRightText)
            if (messageBoxRightText == "You have currently selected more than 8 players!") messageBox.css("color","#FFCCCB")
            else if (messageBoxRightText == "Success!") messageBox.css("color","green")
        }
    }

})

const controlPanelPlayerControlSides = (side) => {
    if (side == "left") {
        // put in current players array
        currentPlayersLeft = []
        $("input:checkbox[name=player]:checked").each(function() {
            for (let i = 0; i < playerArray.length; i++) {
                if ($(this).val() == playerArray[i].playerID) currentPlayersLeft.push(playerArray[i]);
            }
        });
        // Checking whether it has more than 8 players
        if (currentPlayersLeft.length > 8) {
            messageBoxLeftText = "You have currently selected more than 8 players!"
            messageBox.text(messageBoxLeftText)
            messageBox.css("color","#FFCCCB")
            return
        }
        // Remove previous elements
        let removeElements = []
        for (let i = 0; i < previousPlayersLeft.length; i++) {
            if (!currentPlayersLeft.includes(previousPlayersLeft[i])) removeElements.push(previousPlayersLeft[i])
        }
        for (let i = 0; i < playersLeft.childElementCount; i++) {
            for (let j = 0; j < removeElements.length; j++) {
                console.log(playersLeft.children[i].children[3].innerText, removeElements[j].playerName.toUpperCase())
                if (playersLeft.children[i].children[3].innerText == removeElements[j].playerName.toUpperCase()) {
                    console.log("how many times do we reach this condition")
                    playersLeft.children[i].children[2].style.backgroundImage = "none"
                    playersLeft.children[i].children[3].innerText = "PLAYER"
                    playersLeft.children[i].children[4].style.backgroundImage = "none"
                    break
                }
            }
        }
        // Add new elements
        let newElements = []
        for (let i = 0; i < currentPlayersLeft.length; i++) {
            if (!previousPlayersLeft.includes(currentPlayersLeft[i])) newElements.push(currentPlayersLeft[i])
        }
        for (let i = 0; i < newElements.length; i++) {
            for (let j = 0; j < playersLeft.childElementCount; j++) {
                if (playersLeft.children[j].children[3].innerText != "PLAYER") continue
                playersLeft.children[j].children[2].style.backgroundImage = `url("${newElements[i].playerFlag}")`
                playersLeft.children[j].children[3].innerText = newElements[i].playerName.toUpperCase()
                playersLeft.children[j].children[4].style.backgroundImage = `url("https://a.ppy.sh/${newElements[i].playerID}")`
                break
            }
        }
        // Append to list
        previousPlayersLeft = [...currentPlayersLeft]
        // Set Message
        messageBoxLeftText = "Success!"
        messageBox.text(messageBoxLeftText)
        messageBox.css("color","green")
    } else if (side == "right") {
        // put in current players array
        currentPlayersRight = []
        $("input:checkbox[name=player]:checked").each(function() {
            for (let i = 0; i < playerArray.length; i++) {
                if ($(this).val() == playerArray[i].playerID) currentPlayersRight.push(playerArray[i]);
            }
        });
        // Checking whether it has more than 8 players
        if (currentPlayersRight.length > 8) {
            messageBoxRightText = "You have currently selected more than 8 players!"
            messageBox.text(messageBoxRightText)
            messageBox.css("color","#FFCCCB")
            return
        }
        // Remove previous elements
        let removeElements = []
        for (let i = 0; i < previousPlayersRight.length; i++) {
            if (!currentPlayersRight.includes(previousPlayersRight[i])) removeElements.push(previousPlayersRight[i])
        }
        for (let i = 0; i < playersRight.childElementCount; i++) {
            for (let j = 0; j < removeElements.length; j++) {
                console.log(playersRight.children[i].children[3].innerText, removeElements[j].playerName.toUpperCase())
                if (playersRight.children[i].children[3].innerText == removeElements[j].playerName.toUpperCase()) {
                    console.log("how many times do we reach this condition")
                    playersRight.children[i].children[2].style.backgroundImage = "none"
                    playersRight.children[i].children[3].innerText = "PLAYER"
                    playersRight.children[i].children[4].style.backgroundImage = "none"
                    break
                }
            }
        }
        // Add new elements
        let newElements = []
        for (let i = 0; i < currentPlayersRight.length; i++) {
            if (!previousPlayersRight.includes(currentPlayersRight[i])) newElements.push(currentPlayersRight[i])
        }
        for (let i = 0; i < newElements.length; i++) {
            for (let j = 0; j < playersRight.childElementCount; j++) {
                if (playersRight.children[j].children[3].innerText != "PLAYER") continue
                playersRight.children[j].children[2].style.backgroundImage = `url("${newElements[i].playerFlag}")`
                playersRight.children[j].children[3].innerText = newElements[i].playerName.toUpperCase()
                playersRight.children[j].children[4].style.backgroundImage = `url("https://a.ppy.sh/${newElements[i].playerID}")`
                break
            }
        }
        // Append to list
        previousPlayersRight = [...currentPlayersRight]
        // Message box
        messageBoxRightText = "Success!"
        messageBox.text(messageBoxRightText)
        messageBox.css("color","green")
    }
}

const AUFlagURL = "static/flags/AU.png"
const CAFlagURl = "static/flags/CA.png"
const CNFlagURL = "static/flags/CN.png"
const HKFlagURL = "static/flags/HK.png"
const PLFlagURL = "static/flags/PL.png"
const SKFlagURL = "static/flags/SK.png"
const UKFlagURL = "static/flags/UK.png"
const USFlagURL = "static/flags/US.png"

const playerArray = [
    {playerID: "12408961", playerName: "maliszewski", playerFlag: PLFlagURL},
    {playerID: "2165650", playerName: "mcy4", playerFlag: HKFlagURL},
    {playerID: "2558286", playerName: "Rafis", playerFlag: PLFlagURL},
    {playerID: "7813296", playerName: "Rektygon", playerFlag: USFlagURL},
    {playerID: "6114695", playerName: "Ciru", playerFlag: USFlagURL},
    {playerID: "4733121", playerName: "Kariyu", playerFlag: USFlagURL},
    {playerID: "5791401", playerName: "lolol234", playerFlag: CNFlagURL},
    {playerID: "4175698", playerName: "Sytho", playerFlag: USFlagURL},
    {playerID: "4908650", playerName: "im a fancy lad", playerFlag: USFlagURL},
    {playerID: "7562902", playerName: "mrekk", playerFlag: AUFlagURL},
    {playerID: "9501251", playerName: "ChillierPear", playerFlag: USFlagURL},
    {playerID: "3717598", playerName: "Xootynator", playerFlag: CAFlagURl},
    {playerID: "6304246", playerName: "RyuK", playerFlag: CAFlagURl},
    {playerID: "5033077", playerName: "Zylice", playerFlag: CAFlagURl},
    {playerID: "9224078", playerName: "FlyingTuna", playerFlag: SKFlagURL},
    {playerID: "5182050", playerName: "Bubbleman", playerFlag: UKFlagURL}
]