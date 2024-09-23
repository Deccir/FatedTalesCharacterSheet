
function rollDicePool() {
	document.getElementById("dice-successes").value = ""
	document.getElementById("dice-critical-failure").value = ""
	
	const diceElement = document.getElementById("dice-tray").children
	const diceItemCount = diceElement.length // dices is a live collection and will update with each removeChild 
	for (let idx = 0; idx < diceItemCount; idx++) {
		document.getElementById("dice-tray").removeChild(diceElement.item(0))
	}

	let successes = 0
	const diceContainerTemplate = document.getElementById("dice-container-template")
	for (let i = document.getElementById("dice-count").value; i > 0; --i) {
		const random = Math.floor(Math.random() * 10) % 6 + 1;
		if (random == 1) {
			successes -= 1
		}
		else if (random == 2) { }
		else if (random == 6) {
			successes += 2
		}
		else {
			successes += 1
		}

		const duplicate = diceContainerTemplate.cloneNode(true)
		duplicate.removeAttribute("id")
		duplicate.classList.remove("hidden")
		document.getElementById("dice-tray").appendChild(duplicate)
		rollDice(duplicate.children.item(0), random);
	}

	recalculateAccordionMaxHeight("dice-section", [])
	setTimeout(() => {
		if (successes < 1) {
			document.getElementById("dice-result-container").classList.add("critical-failure")
			document.getElementById("dice-critical-failure").value = -successes
		}
		else {
			document.getElementById("dice-result-container").classList.remove("critical-failure")
			document.getElementById("dice-successes").value = successes
		}
	}, 1000)
}

function rollDice(dice, value) {
	dice.style.animation = 'none';

	setTimeout(() => {
		removeResultFromDice(dice)
		dice.style.animation = 'rolling 1s ease 0s forwards normal ';
		dice.classList.add("result-" + value)
	}, 100)
}

function removeResultFromDice(dice) {
	dice.classList.remove("result-" + 1)
	dice.classList.remove("result-" + 2)
	dice.classList.remove("result-" + 3)
	dice.classList.remove("result-" + 4)
	dice.classList.remove("result-" + 5)
	dice.classList.remove("result-" + 6)
}