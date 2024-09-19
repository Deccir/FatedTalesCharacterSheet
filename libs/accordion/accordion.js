function toggleAccordion(id, parentIds = []) {
	const element = document.getElementById(id);
	const content = element.querySelector('.content');
	let maxHeightChange = 0

	if (content.style.maxHeight) {
		maxHeightChange = - parseInt(content.style.maxHeight, 10)
		content.style.maxHeight = null
		content.classList.remove('open')
	} else {
		var padding = getStyleVariable('--accordion-padding');
		maxHeightChange = (content.scrollHeight + parseInt(padding, 10) * 2)
		content.style.maxHeight = maxHeightChange + "px";
		content.classList.add('open')
	}

	for (const parentId of parentIds) {
		updateAccordionMaxHeight(parentId, maxHeightChange)
	}
}

function updateAccordionMaxHeight(id, childHeight) {
	var element = document.getElementById(id);
	var content = element.querySelector('.content');
	content.style.maxHeight = parseInt(content.style.maxHeight, 10) + childHeight + "px";
}

function recalculateAccordionMaxHeight(id, parentIds) {
	const element = document.getElementById(id);
	const content = element.querySelector('.content');
	let maxHeightChange = 0

	if (!content.style.maxHeight) {
		return
	}

	var padding = getStyleVariable('--accordion-padding');
	maxHeightChange = (content.scrollHeight + parseInt(padding, 10) * 2)
	content.style.maxHeight = maxHeightChange + "px";
	for (const parentId of parentIds) {
		updateAccordionMaxHeight(parentId, maxHeightChange)
	}
}