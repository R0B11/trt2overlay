
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