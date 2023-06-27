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
let controlPAnelLeftRightControlSetWinnerButton = $("#controlPAnelLeftRightControlSetWinnerButton")
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
let middleLines = document.getElementById("middleLines")

// Middle players
let leftMiddlePlayer = document.getElementById("leftMiddlePlayer")
let rightMiddlePlayer = document.getElementById("rightMiddlePlayer")

// Winner
let winnerPlayerLeft = document.getElementById("winnerPlayerLeft")
let winnerPlayerRight = document.getElementById("winnerPlayerRight")
let winnerTextFromLeft = document.getElementById("winnerTextFromLeft")
let winnerTextFromRight = document.getElementById("winnerTextFromRight")
// Add side event listeners
// Left Side
for (let i = 0; i < playersLeft.childElementCount; i++) {
    playersLeft.children[i].addEventListener("click", function() {
        if (this.children[3].innerText == "PLAYER") return
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

        // Set details for winner
    })
}
// Right Side
for (let i = 0; i < playersRight.childElementCount; i++) {
    playersRight.children[i].addEventListener("click", function() {
        if (this.children[3].innerText == "PLAYER") return
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

// Middle players add event listener
leftMiddlePlayer.addEventListener("click", function() {
    if (this.children[3].innerText == "PLAYER") return
    if (rightMiddlePlayer.children[3].innerText == "PLAYER") return
    // Add left side as winner
    this.style.backgroundColor = "var(--borderRed)"
    this.children[1].style.backgroundColor = "var(--borderRed)"
    this.children[1].style.color = "white";
    this.children[2].innerHTML = ""
    this.children[3].style.color = "var(--textGold)"
    this.children[4].innerHTML = ""
    this.children[4].style.borderColor = "var(--borderRed)"
    // Right side is not winner
    rightMiddlePlayer.style.backgroundColor = "var(--borderGray)"
    rightMiddlePlayer.children[1].style.backgroundColor = "var(--elementGrayOverlay)"
    rightMiddlePlayer.children[1].style.color = "var(--textGray)"
    if (rightMiddlePlayer.children[2].childElementCount == 0) {
        let flagOverlay = document.createElement("div")
        flagOverlay.classList.add("flagOverlay")
        flagOverlay.classList.add("flagAndProfilePictureOverlay")
        rightMiddlePlayer.children[2].append(flagOverlay)
    }
    rightMiddlePlayer.children[3].style.color = "var(--textGray)"
    rightMiddlePlayer.children[4].style.borderColor = "var(--borderGray)"
    if (rightMiddlePlayer.children[4].childElementCount == 0) {
        let profileOverlay = document.createElement("div")
        profileOverlay.classList.add("flagAndProfilePictureOverlay")
        rightMiddlePlayer.children[4].append(profileOverlay)
    }

    // Set SVGs
    middleLines.innerHTML = ""
    let middleLine = '<line x1="42.5" y1="0" x2="42.5" y2="247" stroke="rgba(255,226,146,1)" stroke-width="3"></line>'
    let leftLine = '<line x1="0" y1="246" x2="42.5" y2="246" stroke="rgba(255,226,146,1)" stroke-width="3"></line>'
    let rightLine = '<line x1="60" y1="246" x2="85" y2="246" stroke="rgba(102,102,105,1)" stroke-width="3"></line>'

    middleLines.innerHTML += middleLine
    middleLines.innerHTML += leftLine
    middleLines.innerHTML += rightLine

    // Set Winner Information
    winnerPlayerLeft.style.display = "block"
    winnerTextFromLeft.style.opacity = "1"
    winnerPlayerRight.style.display = "none"
    winnerTextFromRight.style.opacity = "0"
    let backgroundImageFlag = getComputedStyle(this.children[2]).backgroundImage
    let backgroundImageProfilePicture = getComputedStyle(this.children[4]).backgroundImage
    winnerPlayerLeft.children[1].innerText = this.children[1].innerText
    winnerPlayerLeft.children[2].style.backgroundImage = backgroundImageFlag
    winnerPlayerLeft.children[3].innerText = this.children[3].innerText
    winnerPlayerLeft.children[4].style.backgroundImage = backgroundImageProfilePicture
})
rightMiddlePlayer.addEventListener("click", function() {
    if (this.children[3].innerText == "PLAYER") return
    if (leftMiddlePlayer.children[3].innerText == "PLAYER") return
    // Add right side as winner
    this.style.backgroundColor = "var(--borderRed)"
    this.children[1].style.backgroundColor = "var(--borderRed)"
    this.children[1].style.color = "white";
    this.children[2].innerHTML = ""
    this.children[3].style.color = "var(--textGold)"
    this.children[4].innerHTML = ""
    this.children[4].style.borderColor = "var(--borderRed)"
    // Left side is not winner
    leftMiddlePlayer.style.backgroundColor = "var(--borderGray)"
    leftMiddlePlayer.children[1].style.backgroundColor = "var(--elementGrayOverlay)"
    leftMiddlePlayer.children[1].style.color = "var(--textGray)"
    if (leftMiddlePlayer.children[2].childElementCount == 0) {
        let flagOverlay = document.createElement("div")
        flagOverlay.classList.add("flagOverlay")
        flagOverlay.classList.add("flagAndProfilePictureOverlay")
        leftMiddlePlayer.children[2].append(flagOverlay)
    }
    leftMiddlePlayer.children[3].style.color = "var(--textGray)"
    leftMiddlePlayer.children[4].style.borderColor = "var(--borderGray)"
    if (leftMiddlePlayer.children[4].childElementCount == 0) {
        let profileOverlay = document.createElement("div")
        profileOverlay.classList.add("flagAndProfilePictureOverlay")
        leftMiddlePlayer.children[4].append(profileOverlay)
    }

    // Set SVGs
    middleLines.innerHTML = ""
    let middleLine = '<line x1="42.5" y1="0" x2="42.5" y2="247" stroke="rgba(255,226,146,1)" stroke-width="3"></line>'
    let leftLine = '<line x1="0" y1="246" x2="25" y2="246" stroke="rgba(102,102,105,1)" stroke-width="3"></line>'
    let rightLine = '<line x1="42.5" y1="246" x2="85" y2="246" stroke="rgba(255,226,146,1)" stroke-width="3"></line>'

    middleLines.innerHTML += middleLine
    middleLines.innerHTML += leftLine
    middleLines.innerHTML += rightLine

    // Set Winner Information
    winnerPlayerLeft.style.display = "none"
    winnerTextFromLeft.style.opacity = "0"
    winnerPlayerRight.style.display = "block"
    winnerTextFromRight.style.opacity = "1"
    let backgroundImageFlag = getComputedStyle(this.children[2]).backgroundImage
    let backgroundImageProfilePicture = getComputedStyle(this.children[4]).backgroundImage
    winnerPlayerRight.children[1].innerText = this.children[1].innerText
    winnerPlayerRight.children[2].style.backgroundImage = backgroundImageFlag
    winnerPlayerRight.children[3].innerText = this.children[3].innerText
    winnerPlayerRight.children[4].style.backgroundImage = backgroundImageProfilePicture
})

controlPanelLeftSideSelect.on("change", () => {
    let side = controlPanelLeftSideSelect.val()
    if (side == "middle") {
        controlPanelMiddleControl.css("display","block")
        controlPanelLeftRightControl.css("display","none")
    } else {
        controlPanelMiddleControl.css("display","none")
        controlPanelLeftRightControl.css("display","block")
        controlPanelLeftRightControlButton.attr("onclick",`controlPanelPlayerControlSides("${side}")`)
        controlPAnelLeftRightControlSetWinnerButton.attr("onclick",`controlPanelPlayerResetWinner("${side}")`)
        
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

const controlPanelPlayerResetWinner = (side) => {
    // Reset lines
    if (side == "left") {
        leftLines.innerHTML = ""
        middleLines.innerHTML = ""
        
        // Reset left
        for (let i = 0; i < playersLeft.childElementCount; i++) {
            playersLeft.children[i].style.backgroundColor = "var(--borderGray)"
            playersLeft.children[i].children[1].style.backgroundColor = "var(--elementGray)"
            playersLeft.children[i].children[1].style.color = "white"
            playersLeft.children[i].children[2].innerHTML = ""
            playersLeft.children[i].children[3].style.color = "white"
            playersLeft.children[i].children[4].style.borderColor = "var(--borderGray)"
            playersLeft.children[i].children[4].innerHTML = ""
        }
        
        // Reset middle left
        leftMiddlePlayer.style.backgroundColor = "var(--borderGray)"
        leftMiddlePlayer.children[1].style.backgroundColor = "var(--elementGray)"
        leftMiddlePlayer.children[1].style.color = "var(--textGray)"
        leftMiddlePlayer.children[1].innerText = ""
        leftMiddlePlayer.children[2].innerHTML = ""
        leftMiddlePlayer.children[2].style.backgroundImage = "none"
        leftMiddlePlayer.children[3].style.color = "var(--textGray)"
        leftMiddlePlayer.children[3].innerText = "PLAYER"
        leftMiddlePlayer.children[4].style.borderColor = "var(--borderGray)"
        leftMiddlePlayer.children[4].innerHTML = ""
        leftMiddlePlayer.children[4].style.backgroundImage = "none"

        // Reset middle right
        rightMiddlePlayer.style.backgroundColor = "var(--borderGray)"
        rightMiddlePlayer.children[1].style.backgroundColor = "var(--elementGray)"
        rightMiddlePlayer.children[1].style.color = "var(--textGray)"
        rightMiddlePlayer.children[2].innerHTML = ""
        rightMiddlePlayer.children[3].style.color = "var(--textGray)"
        rightMiddlePlayer.children[4].style.borderColor = "var(--borderGray)"
        rightMiddlePlayer.children[4].innerHTML = ""

        // Reset winner
        winnerPlayerLeft.style.display = "none"
        winnerPlayerRight.style.display = "none"
        winnerTextFromLeft.style.opacity = 0
        winnerTextFromRight.style.opacity = 0

    } else if (side == "right") {
        rightLines.innerHTML = ""
        middleLines.innerHTML = ""
    
        // Reset right
        for (let i = 0; i < playersRight.childElementCount; i++) {
            playersRight.children[i].style.backgroundColor = "var(--borderGray)"
            playersRight.children[i].children[1].style.backgroundColor = "var(--elementGray)"
            playersRight.children[i].children[1].style.color = "white"
            playersRight.children[i].children[2].innerHTML = ""
            playersRight.children[i].children[3].style.color = "white"
            playersRight.children[i].children[4].style.borderColor = "var(--borderGray)"
            playersRight.children[i].children[4].innerHTML = ""
        }
        
        // Reset middle right
        rightMiddlePlayer.style.backgroundColor = "var(--borderGray)"
        rightMiddlePlayer.children[1].style.backgroundColor = "var(--elementGray)"
        rightMiddlePlayer.children[1].style.color = "var(--textGray)"
        rightMiddlePlayer.children[1].innerText = ""
        rightMiddlePlayer.children[2].innerHTML = ""
        rightMiddlePlayer.children[2].style.backgroundImage = "none"
        rightMiddlePlayer.children[3].style.color = "var(--textGray)"
        rightMiddlePlayer.children[3].innerText = "PLAYER"
        rightMiddlePlayer.children[4].style.borderColor = "var(--borderGray)"
        rightMiddlePlayer.children[4].innerHTML = ""
        rightMiddlePlayer.children[4].style.backgroundImage = "none"

        // Reset middle left
        leftMiddlePlayer.style.backgroundColor = "var(--borderGray)"
        leftMiddlePlayer.children[1].style.backgroundColor = "var(--elementGray)"
        leftMiddlePlayer.children[1].style.color = "var(--textGray)"
        leftMiddlePlayer.children[2].innerHTML = ""
        leftMiddlePlayer.children[3].style.color = "var(--textGray)"
        leftMiddlePlayer.children[4].style.borderColor = "var(--borderGray)"
        leftMiddlePlayer.children[4].innerHTML = ""

        // Reset winner
        winnerPlayerLeft.style.display = "none"
        winnerPlayerRight.style.display = "none"
        winnerTextFromLeft.style.opacity = 0
        winnerTextFromRight.style.opacity = 0
    }
} 

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
    {playerID: "9224078", playerName: "FlyingTuna", playerFlag: KRFlagURL},
    {playerID: "5182050", playerName: "Bubbleman", playerFlag: UKFlagURL}
]