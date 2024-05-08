const cards = document.querySelectorAll('.card')
let matched = 0
let cardOne, cardTwo
let disableDeck = false
let openCards = []
let countdownElement = document.getElementById('second')
let lifeCount = 3
let interval 
let cardsList = [
{ img: 'img-1.jpg', flips: 0 },
{ img: 'img-2.jpg', flips: 0 },
{ img: 'img-3.jpg', flips: 0 },
{ img: 'img-4.jpg', flips: 0 },
{ img: 'img-5.jpg', flips: 0 },
{ img: 'img-6.jpg', flips: 0 },
{ img: 'img-7.jpg', flips: 0 },
{ img: 'img-8.jpg', flips: 0 }
];
const decrementLife=(()=> {
lifeCount-- 
updateLifeUI()

if (lifeCount === 0) {
clearInterval(interval)
countdownElement.innerHTML = 'Game Over! No lifes left.. Try again'
alert("Game Over! No lifes left.. Try again")
shuffleCard()
countdown(1)

}
flips = 0
})
const updateLifeUI=(()=> {
const lifeImages = document.querySelectorAll('.lifes img')
for (let i = 0; i < lifeImages.length; i++) {
if (i < lifeCount) {
    lifeImages[i].style.display = 'block'
} else {
    lifeImages[i].style.display = 'none'
}
}
})
let updateFlips = (img) => {
let imageName =
img.substring(img.lastIndexOf('/') + 1, img.lastIndexOf('.')) + '.jpg'
console.log(imageName)
let index = cardsList.findIndex((card) => card.img === imageName)

if (index !== -1) {
cardsList[index].flips++

console.log(
    'Current flip count for ' + img + ' is: ' + cardsList[index].flips
)
if (cardsList[index].flips > 2) {
    decrementLife()
    cardsList[index].flips = 0 
}
} else {
console.log('Image ' + img + ' not found in cardsList')
}
}
let flipCard = ({ target: clickedCard }) => {
if (cardOne !== clickedCard && !disableDeck) {
clickedCard.classList.add('flip')
if (!cardOne) {
    return (cardOne = clickedCard)
}
cardTwo = clickedCard
disableDeck = true
let cardOneImg = cardOne.querySelector('.back-view img').src,
    cardTwoImg = cardTwo.querySelector('.back-view img').src
matchCards(cardOneImg, cardTwoImg)
}
}
let matchCards = (img1, img2) => {

if (img1 === img2) {
matched++
const pushToOpenCards = (matchCards) => {
    openCards.push(matchCards)
    if ((openCards.length = 3)) {
    }
}
pushToOpenCards(matchCards)
console.log(openCards)
if (matched == 8) {
    setTimeout(() => {
    return shuffleCard()
    }, 1000)
}
cardOne.removeEventListener('click', flipCard)
cardTwo.removeEventListener('click', flipCard)
cardOne = cardTwo = ''
return (disableDeck = false)
} else {
updateFlips(img1)
shakeAndReset()
}
}
const shakeAndReset=(() =>{
setTimeout(() => {
cardOne.classList.add('shake')
cardTwo.classList.add('shake')
}, 400)

setTimeout(() => {
cardOne.classList.remove('shake', 'flip')
cardTwo.classList.remove('shake', 'flip')
cardOne = cardTwo = ''
disableDeck = false
}, 1200)
})

let shuffleCard = () => {
matched = 0
disableDeck = false
cardOne = cardTwo = ''
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
arr.sort(() => (Math.random() > 0.5 ? 1 : -1))
cards.forEach((card, i) => {
card.classList.remove('flip')
let imgTag = card.querySelector('.back-view img')
imgTag.src = `cards/img-${arr[i]}.JPG`
card.addEventListener('click', flipCard)
})
}
shuffleCard()

cards.forEach((card) => {
card.addEventListener('click', flipCard)
})

let countdown = (minutes) => {
 let seconds = minutes * 60
interval = setInterval( ()=> {
let minutesRemaining = Math.floor(seconds / 60)
let secondsRemaining = seconds % 60;

countdownElement.innerHTML =
    minutesRemaining +
    ':' +
    (secondsRemaining < 10 ? '0' : '') +
    secondsRemaining

if (--seconds < 0) {
    clearInterval(interval)
    countdownElement.innerHTML = 'Time Up .. Try again'
    alert("Time Up .. Try again")
    shuffleCard()
    countdown(1.5)
}
if (matched == 8) {
    clearInterval(interval)
    countdownElement.innerHTML = 'You Win !!!'
    alert("You Win !!!")

    countdown(1.5)
    shuffleCard()

}
}, 1000)
}

countdown(1.5)