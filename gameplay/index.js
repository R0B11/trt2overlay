// Commentator Names
let commentatorNameInput1 = $("#commentatorNameInput1")
let commentatorNameInput2 = $("#commentatorNameInput2")
let commentatorName1 = document.getElementById("commentatorName1")
let commentatorName2 = document.getElementById("commentatorName2")

function changeCommentatorNames() {
    if (commentatorNameInput1.val().trim().toLowerCase() == "empty") commentatorName1.innerText = ""
    else if (commentatorNameInput1.val().trim() != "") commentatorName1.innerText = commentatorNameInput1.val().trim().toUpperCase()

    if (commentatorNameInput2.val().trim().toLowerCase() == "empty") commentatorName2.innerText = ""
    else if (commentatorNameInput2.val().trim() != "") commentatorName2.innerText = commentatorNameInput2.val().trim().toUpperCase()
}