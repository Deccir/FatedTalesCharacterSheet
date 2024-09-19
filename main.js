let editModeEnabled = true

//#region general

// let window = {} // uncomment for testing if build succeeds

window.onload = () => {
	setLoading(true)
	window.addEventListener("beforeunload", function (e) {
		saveSheet()
	})
	document.addEventListener('keydown', e => {
		if ((e.ctrlKey || e.metaKey) && e.key === 's') {
			e.preventDefault();
			saveSheet()
		}
	});

	var existingConnection = loadFromLocalStorage("googleDriveConnection")
	var existingDriveSaveFile = loadFromLocalStorage("googleDriveSaveFile")

	if (!(existingConnection && existingDriveSaveFile)) {
		restoreSheetFromLocalstorage()
		setLoading(false)
	}

	// setEditMode(editModeEnabled)
}

function setEditMode(value) {
	let editableInputs = document.getElementsByClassName("edit-mode-only")
	if (value == false) {
		document.body.classList.add("view-mode")
		for (let i = 0; i < editableInputs.length; i++) {
			editableInputs.item(i).removeAttribute("readonly")
		}
	}
	else {
		document.body.classList.remove("view-mode")
		for (let i = 0; i < editableInputs.length; i++) {
			editableInputs.item(i).setAttribute("readonly", "" + value)
		}
	}

	editModeEnabled = value
}

function closeDialog(id) {
	document.getElementById(id).close();
}

function setLoading(active) {
	if (active) {
		document.getElementById("loading-spinner-overlay").classList.remove("hidden")
	}
	else {
		document.getElementById("loading-spinner-overlay").classList.add("hidden")
	}
}

function toggleDarkMode() {
	document.documentElement.classList.toggle("darkmode")
}

function toggleSidebar() {
	const sidebar = document.getElementById("sidebar")
	sidebar.classList.toggle("open")
}

function copyElementValueToClipboard(elementId) {
	var element = document.getElementById(elementId)
	navigator.clipboard.writeText(element.value);
	toast(getTranslation("copied-to-clipboard"), 'success', 5)
}

function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
	toast(getTranslation("copied-to-clipboard"), 'success', 5)
}

//#endregion general

//#region modifiylists

function addAbilityRow() {
	var abilities = document.getElementsByClassName("ability")
	let rowId = abilities.length == 1 ? 1 : parseInt(abilities.item(abilities.length - 1).id.split("ability-")[1]) + 1

	let element = document.getElementById("ability-template")
	let duplicate = element.cloneNode(true)
	duplicate.classList.remove("hidden")

	duplicate.setAttribute("id", "ability-" + rowId)
	document.getElementById("ability-container").appendChild(duplicate)
	let children = duplicate.childNodes
	children.item(1).id = "ability-" + rowId + "-stress-1"
	children.item(1).name = "ability-" + rowId + "-stress-1"
	children.item(3).id = "ability-" + rowId + "-stress-2"
	children.item(3).name = "ability-" + rowId + "-stress-2"
	children.item(5).id = "ability-" + rowId + "-name"
	children.item(5).name = "ability-" + rowId + "-name"
	children.item(7).id = "ability-" + rowId + "-level"
	children.item(7).name = "ability-" + rowId + "-level"
	children.item(9).onclick = function () { removeAbilityRow("ability-" + rowId) }

	return duplicate
}

function removeAbilityRow(id) {
	document.getElementById("ability-container").removeChild(document.getElementById(id))
}


//#endregion modifiylists

//#region inputhelper

function fitText(event) {
	adjustFontSize(event.target, event.target.clientWidth)
}

function adjustFontSize(container, desiredWidth) {
	let fontSize = parseInt(window.getComputedStyle(container, null).getPropertyValue('font-size'))
	if (container.scrollWidth > desiredWidth) {
		while (container.scrollWidth > desiredWidth && fontSize > 0) {
			fontSize--
			container.style.fontSize = fontSize + 'px'
		}
	}
	else {
		if (container.value && fontSize < 12) {
			while (container.scrollWidth <= desiredWidth && fontSize > 0) {
				fontSize++
				container.style.fontSize = fontSize + 'px'
			}
			fontSize--
			container.style.fontSize = fontSize + 'px'
		}
	}
}

function limitInput(event) {
	const input = event.target
	const value = parseInt(input.value)
	const min = parseInt(input.min || 0)

	if (isNaN(value)) {
		input.value = min
	} else {
		const max = parseInt(input.max || Number.MAX_SAFE_INTEGER)

		if (value < min) {
			input.value = min
		} else if (value > max) {
			input.value = max
		}
	}
}

//#endregion inputhelper

//#region save and load

function openExportDialog() {
	document.getElementById("export-dialog").showModal();
	document.getElementById("export-area").value = JSON.stringify(getSaveFile(), null, 4)

}

function closeExportDialog() {
	document.getElementById("export-dialog").close();
	document.getElementById("export-area").value = ""
}


function openImportDialog() {
	document.getElementById("import-dialog").showModal();
}

function closeImportDialog(shouldImport) {
	console.log(shouldImport)
	if (shouldImport) {
		const input = document.getElementById("import-area").value
		console.log(input)
		if (isJsonString(input) == false) {
			toast(getTranslation("save-import-failed"), 'error', 5)
			console.log("error")
			return
		}
		var saveFile = JSON.parse(input)
		console.log(saveFile)
		unloadCurrentFile()
		restoreSheet(saveFile)
		saveSheet()
	}

	document.getElementById("import-dialog").close();
	document.getElementById("import-area").value = ""
}

function isJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}


function getSaveFile() {
	let saveFile = {}

	saveFile["darkmode"] = document.documentElement.classList.contains("darkmode")
	saveFile["language"] = currentLocale

	let matches = document.querySelectorAll("input")
	for (let match of matches) {
		let key = match.getAttribute("name")
		if (key == null) {
			continue
		}

		let value
		if (match.getAttribute("type") == "checkbox") {
			value = match.checked
		}
		else {
			value = match.value
			if (!value) {
				continue
			}
		}
		saveFile[match.getAttribute("name")] = value
	}

	matches = document.querySelectorAll("textarea")
	for (let match of matches) {
		let key = match.getAttribute("name")
		if (key == null) {
			continue
		}

		let value = match.value
		if (!value) {
			continue
		}
		saveFile[match.getAttribute("name")] = value
	}

	return saveFile
}

function saveSheet() {
	let saveFile = getSaveFile()

	saveToLocalStorage("sheetData", saveFile)
	saveToGoogleDrive(saveFile) // only saves if connected to a save file
}

function restoreSheetFromLocalstorage() {
	let data = loadFromLocalStorage("sheetData") ?? {}
	restoreSheet(data)
}

function restoreSheet(savedFile) {
	if (savedFile["darkmode"] != false) {
		document.documentElement.classList.add("darkmode")
	} else {
		document.documentElement.classList.remove("darkmode")
	}

	const gridItems = document.getElementById("inventory-grid").children
	const gridItemCount = gridItems.length // gridItems is a live collection and will update with each removeChild 
	for (let idx = 1; idx < gridItemCount; idx++) {
		document.getElementById("inventory-grid").removeChild(gridItems.item(1))
	}
	
	const itemTemplate = document.getElementById("item-template")
	for (let idx = 0; idx < 6; idx++) {
		const duplicate = itemTemplate.cloneNode(true)
		duplicate.classList.remove("hidden")
		duplicate.setAttribute("id", "item-" + idx)
		document.getElementById("inventory-grid").appendChild(duplicate)

		let itemElements = duplicate.childNodes
		itemElements.item(1).onclick = function () { duplicate.classList.remove("empty") }

		itemElements = itemElements.item(3).childNodes
		itemElements.item(1).onclick = function () {
			duplicate.classList.add("empty")
			itemElements.item(3).value = ""
			itemElements.item(5).value = ""
		}
		itemElements.item(3).id = "item-" + idx + "-name"
		itemElements.item(3).name = "item-" + idx + "-name"
		itemElements.item(5).id = "item-" + idx + "-description"
		itemElements.item(5).name = "item-" + idx + "-description"
	}

	let matches = document.querySelectorAll("input")
	for (let input of matches) {
		const key = input.getAttribute("name")
		if (key == null) {
			continue
		}
		if (savedFile.hasOwnProperty(key) == false) {
			continue
		}

		const value = savedFile[key]
		if (input.getAttribute("type") == "checkbox") {
			input.checked = value
		}
		else {
			input.value = value
		}
	}

	matches = document.querySelectorAll("textarea")
	for (let textarea of matches) {
		const key = textarea.getAttribute("name")
		if (key == null) {
			continue
		}
		if (savedFile.hasOwnProperty(key) == false) {
			continue
		}
		textarea.value = savedFile[key]
	}

	const abilites = document.getElementById("ability-container").children
	for (let idx = 0; idx < abilites.length; idx++) {
		if (idx == 0) {
			continue
		}
		document.getElementById("ability-container").removeChild(abilites.item(idx))
	}
	const abilityIds = Array.from(new Set(Object.keys(savedFile)
		.filter(key => key.startsWith("ability-") && key.endsWith("-name"))
		.map(key => key.split("ability-")[1].split("-name")[0])
	))
	for (let abilityId of abilityIds) {
		let abilityElemements = addAbilityRow().childNodes
		abilityElemements.item(1).checked = savedFile["ability-" + abilityId + "-stress-1"]
		abilityElemements.item(3).checked = savedFile["ability-" + abilityId + "-stress-2"]
		abilityElemements.item(5).value = savedFile["ability-" + abilityId + "-name"]
		abilityElemements.item(7).value = savedFile["ability-" + abilityId + "-level"]
	}

	const itemIds = Array.from(new Set(Object.keys(savedFile).filter(key => key.startsWith("item-")).map(key => key.split("item-")[1].split("-")[0])))
	for (let itemId of itemIds) {
		const element = document.getElementById("item-" + itemId)
		element.classList.remove("empty")
	}

	for (let i = 1; i < 7; i++) {
		const appearance_element = document.getElementById("appearance-" + i)
		adjustFontSize(appearance_element, appearance_element.clientWidth)
	}
	for (let i = 1; i < 7; i++) {
		const ailment_element = document.getElementById("ailment-" + i)
		adjustFontSize(ailment_element, ailment_element.clientWidth)
	}

	setLocale(savedFile["language"] ?? "DE") 
}

function loadFromLocalStorage(name) {
	return JSON.parse(localStorage.getItem(name))
}

function saveToLocalStorage(name, data) {
	if (data == null) {
		localStorage.removeItem(name)
		return
	}
	localStorage.setItem(name, JSON.stringify(data))
}

function getStyleVariable(name) {
	const rootStyles = getComputedStyle(document.documentElement);
	return rootStyles.getPropertyValue(name);
}

//#endregion save and load

//#region logic

//#endregion logic