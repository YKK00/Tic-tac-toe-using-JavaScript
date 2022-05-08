const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
let oneNum = 0
let twoNum = 0
let clickNum = 0
//list all situations
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame();

restartButton.addEventListener('click', startGame);

function time() {
	let m = 2;
	let s = 60;
	document.getElementById('time').innerText = '03:00';
	setInterval(() => {
		let txt = '';
		s = s - 1;
		if (s < 0) {
			s = 60;
			m = m - 1;
		} else {
			if (m <= 0 && s == 0) {
				m = 2
				s = 60
				document.getElementById('time').innerText = '03:00';
				winningMessageTextElement.innerHTML = `
				<span>${oneNum == twoNum ? 'Draw!' : oneNum < twoNum ? 'Player2 Wins!' : 'Player1 Wins!'}</span><br/>
				<span>Player1 : Player2 = ${oneNum} : ${twoNum}</span>
				`;
				winningMessageElement.classList.add('show')
				twoNum = 0
				oneNum = 0
				document.getElementById('two').innerText = twoNum
				document.getElementById('one').innerText = oneNum
			} else {
				txt = txt + '0' + m + ':';
				txt = s < 10 ? txt + '0' + s : txt + s;
				document.getElementById('time').innerText = txt
			}
		}

	}, 1000)
}

time()

function startGame() {
	circleTurn = false
	cellElements.forEach(cell => {
		cell.classList.remove(X_CLASS)
		cell.classList.remove(CIRCLE_CLASS)
		cell.removeEventListener('click', handleClick)
		cell.addEventListener('click', handleClick, {
			once: true
		})
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function handleClick(e) {
	clickNum += 1;
	const cell = e.target
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = 'Draw!'
	} else {
		winningMessageTextElement.innerText = `${circleTurn ? "Player2" : "Player1"} Wins!`
		if (circleTurn) {
			twoNum += 1
			document.getElementById('two').innerText = twoNum
		} else {
			oneNum += 1
			document.getElementById('one').innerText = oneNum
		}
	}
	winningMessageElement.classList.add('show')
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	circleTurn = !circleTurn
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS)
	board.classList.remove(CIRCLE_CLASS)
	// if (clickNum) {
	document.getElementById('img1').style.opacity = 0
	document.getElementById('img2').style.opacity = 0
	// }
	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS)
		// if (clickNum) {
		document.getElementById('img2').style.opacity = 1
		// }

	} else {
		board.classList.add(X_CLASS)
		// if (clickNum) {
		document.getElementById('img1').style.opacity = 1
		// }
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}