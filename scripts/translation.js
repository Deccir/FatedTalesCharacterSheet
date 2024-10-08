const translations = {
	"DE": {
		"save": "Speichern",
		"save-file": "Speicherstand",
		"google-drive": "Google Drive",
		"gd-connect": "Verbinden",
		"gd-disconnect": "Verbindung trennen",
		"gd-load": "Laden",
		"gd-save-as": "Speichern als",
		"gd-share": "Teilen",
		"gd-share-copy": "Kopieren",
		"save-local": "Lokal",
		"save-export": "Exportieren",
		"save-import": "Importieren",
		"notes": "Notizen",
		"dice": "Würfel",
		"roll-dice": "Würfeln",
		"char-name": "Charaktername",
		"player-name": "Spielername",
		"trademark": "Markenzeichen",
		"trademark-tooltip": "Was ist eine Eigenheit deines Charakters, die keinen mechanischen Nutzen oder Nachteil erzeugt. Hat er eine besondere Art zu reden? Kämpft er auf eine besondere Weise?",
		"appearance": "Aussehen",
		"appearance-tooltip": "Welche Aspekte fallen einem als erstes auf, wenn man deinen Charakter sieht",
		"goal": "Ziel",
		"goal-tooltip": "Was will dein Charakter erreichen? Was erhofft er sich am Ende seiner Reise zu finden?",
		"past": "Vergangenheit",
		"past-tooltip": "Ein wichtiges Ereignis im Leben deines Charakters. Eine Person, eine Organisation, vielleicht etwas, was er verloren hat oder etwas in das er involviert war.",
		"personality": "Persönlichkeit",
		"personality-tooltip": "Wie verhält sich dein Charakter? Wie sieht er die Welt um sich? Welche moralischen Vorstellungen hat er",
		"conflicts": "Konflikte",
		"conflicts-tooltip": "Was macht deinem Charakter das Leben schwer? Was hält ihn davon ab seine Ziele zu erreichen? Hat er eine dunkle Seite, die er versucht zu verstecken?",
		"other-traits": "Sonstige Merkmale",
		"other-traits-tooltip": "Diese Felder sollten anfangs leer gelassen werden und erst im Verlauf des Abenteuers gefüllt werden.",
		"resilience-points": "Belastbarkeitspunkte",
		"resilience-points-tooltip": "Belastbarkeitspunkte stellen die Widerstandsfähigkeit deines Charakters dar. Schlägt eine Probe fehl, so verlierst du einen Belastbarkeitspunkt (<b>BP</b>). Hast du keine freien Punkte mehr, erleidest du beim nächsten Mal statt Stress einen Nachteil.",
		"ailment": "Nachteile",
		"ailment-tooltip": "Ein Nachteil stellt eine Beeinträchtigung deines Charakters dar. Füllt er alle 6 Felder mit Nachteilen, so scheidet dein Charakter aus dem Abenteuer aus.",
		"class": "Klassen",
		"class-tooltip": "Klassen beschreiben größere Themengebiete, in denen dein Charakter gelernt ist. Es kann ein Beruf, eine magische Veranlagung, ein technisches Implantat, etc. sein. Um eine Klasse auf Level 3 zu bringen muss der Charakter zuerst 30 EP in Fertigkeiten investiert haben. Für Level 4 sind es mindestens 40 EP.",
		"resilience-abbrev": "BP",
		"class-name": "Name",
		"class-level": "Level",
		"equipment": "Ausrüstung",
		"equipment-tooltip": "Dein Charakter kann nur maximal 6 Gegenstände mit besonderen Effekten mit sich tragen.",
		"other-items": "Sonstige Gegenstände",
		"experience-points-abbrev": "EP",
		"experience-points-tooltip": "Erfahrungspunkte (EP) können benutzt werden, um Fertigkeiten, Klassen erwerben und zu verbessern.",
		"gear-points-abbrev": "AP",
		"gear-points-tooltip": "Ausrüstungspunkte (AP) können benutzt werden, um Items mit besonderen Fähigkeiten zu erwerben und zu verbessern.",
		"good-rations": "Gute Verpflegung",
		"good-rations-tooltip": "Während einer Rast kannst du 2 BP deines Charakters oder 4 BP verteilt auf Klassen und Fertigkeiten verteilt wiederherstellen.",
		"abilities": "Fertigkeiten",
		"abilities-tooltip": "Fertigkeiten sind einzelne Aktionen, in denen dein Charakter gut ist. Um eine Fertigkeit auf Level 4 oder höher zu bringen, muss dein Charakter mindestens 1 weitere Fertigkeit auf dem nächst niedrigeren Level besitzen.",
		"gd-save-filename": "Dateiname",
		"gd-save-foldername": "Speicherort",
		"gd-set-save-foldername": "Speicherort setzen",
		"gd-default-save-foldername": "Standard Speicherort verwenden",
		"load-gd-warning": "Stellen sie sicher, dass, bevor sie fortfahren, alle Änderungen gespeichert sind, da diese sonst verloren gehen verloren.",
		"cancel": "Abbrechen",
		"continue": "Weiter",
		"close": "Schließen",
		"successes": "Erfolge",
		"failures": "Stress",
		"critical-failure": "Kritischer Fehlschlag",
		"token-client-error": "Fehler bei der Verbindung zu Google",
		"gapi-client-get-error": "Fehler bei Dateianfrage von Google",
		"gapi-client-json-error": "The save file could not be loaded",
		"gapi-client-save-error": "Fehler beim Speichern des Spielstandes in Google",
		"copied-to-clipboard": "Link in Zwischenablage kopiert",
		"save-import-failed": "Fehler beim Import des Spielstandes",
		"import-gd-warning": "Warnung: Importieren trennt die Verbindung zum, aktuell in Google Drive gespeicherten, Spielstand.",
		"rolling-tooltip": "Du startest immer mit <b>2 Würfeln</b>.<br><br>Hat dein Charakter passende <b>Fertigkeiten oder Klassen</b> kannst du eine von ihnen wählen und erhälst zusätzliche Würfel <b>in Höhe ihres Levels</b>.<br><br>Du erhälst <b>einen zusätzlichen</b> Würfel oder <b>verlierst einen</b>, wenn dein Charakter mindestens ein passendes Merkmal hast. Hilfreiche und hinderliche Merkmale heben sich gegenseitig auf, unabhängig davon, wie viele dein Charakter von jedem hat.<br><br>Hat dein Charakter einen Nachteil, der die Probe negativ beeinflusst, so wird die <b>Anzahl der Würfel halbiert</b> (aufgerundet).<br><br>Wenn ein anderer Charakter deinem Charakter hilft, erhältst du <b>einen Würfel</b>",
		"rolling-result-tooltip": "Würfelaugen -> Anzahl Erfolge<br>1 -> -1<br>2 -> 0<br>3-5 -> 1<br>6 -> 2"
	},
	"EN": {
		"save": "Save",
		"save-file": "Savestate",
		"google-drive": "Google Drive",
		"gd-connect": "Connect",
		"gd-disconnect": "Disconnect",
		"gd-load": "Load",
		"gd-save-as": "Save As",
		"gd-share": "Share",
		"gd-share-copy": "Copy",
		"save-local": "Local",
		"save-export": "Export",
		"save-import": "Import",
		"notes": "Notes",
		"dice": "Dice",
		"roll-dice": "Roll",
		"char-name": "Character name",
		"player-name": "Player name",
		"trademark": "Signature Action",
		"trademark-tooltip": "Name a quirk of your character that creates no mechanical advantage or disadvantage. Do they have a special way of speaking? Do they fight in a special way?",
		"appearance": "Appearance",
		"appearance-tooltip": "What aspects do you notice first when you see your character",
		"goal": "Goal",
		"goal-tooltip": "What does your character want to achieve? What do they hope to find at the end of their journey?",
		"past": "Past",
		"past-tooltip": "An important event in your characters life. A person, an organization, maybe something they've lost or something they've gotten involved with.",
		"personality": "Personality",
		"personality-tooltip": "How does your character behave? How do they see the world around them? What morals do they have?",
		"conflicts": "Conflicts",
		"conflicts-tooltip": "What makes life difficult for your character? What is stopping them from achieving their goals? Do they have a dark side that they're trying to hide?",
		"other-traits": "Other Traits",
		"other-traits-tooltip": "These fields should initially be left blank and filled over the course of the adventure",
		"resilience-points": "Resilience points",
		"resilience-points-tooltip": "Resilience points represent your characters resilience. If a check fails, you lose a resilience point. If you don't have any points left, the next time you would normally lose a resilience point you will suffer an ailment instead.",
		"ailment": "Ailments",
		"ailment-tooltip": "An ailment represents a disadvantage of your character. When your character gains their 6ths Ailment they drop out of the adventure",
		"class": "Classes",
		"class-tooltip": "Classes describe larger subject areas in which your character is trained. It can be a profession, a magical predisposition, a technical implant, etc. To bring a class to level 3, the character must first have invested 30 XP in their skills. For level 4 they need at least 40 XP.",
		"resilience-abbrev": "RP",
		"class-name": "Name",
		"class-level": "Level",
		"equipment": "Equipment",
		"equipment-tooltip": "Your character can only carry a maximum of 6 items with special effects.",
		"other-items": "Other Items",
		"experience-points-abbrev": "XP",
		"experience-points-tooltip": "Experience Points (XP) can be used to purchase and improve skills and classes.",
		"gear-points-abbrev": "GP",
		"gear-points-tooltip": "Gear Points (GP) can be used to purchase and improve items.",
		"good-rations": "Good Rations",
		"good-rations-tooltip": "While resting you can restore<br>2 BP of your character or 4 BP<br>across your classes and abilities.",
		"abilities": "Abilities",
		"abilities-tooltip": "Skills are individual actions that your character is good at. To get a skill to level 4 or higher, your character must have at least 1 additional skill at the next lower level.",
		"gd-save-filename": "Filename",
		"gd-save-foldername": "Save location",
		"gd-set-save-foldername": "Set Save location",
		"gd-default-save-foldername": "Set default Save location",
		"load-gd-warning": "Any unsaved changes will be lost.",
		"cancel": "Cancel",
		"continue": "Continue",
		"close": "Close",
		"successes": "Successes",
		"failures": "Stress",
		"critical-failure": "Critical Failure",
		"token-client-error": "Error while connecting to google",
		"gapi-client-get-error": "Error while getting file from google",
		"gapi-client-json-error": "The save file could not be loaded",
		"gapi-client-save-error": "Error while saving to google",
		"copied-to-clipboard": "Link copied to clipboard",
		"save-import-failed": "Error while importing the save",
		"import-gd-warning": "Warning: Importing severs the connection to the save file currently stored in Google Drive",
		"rolling-tooltip": "You always start with <b>2 dice</b>.<br><br>If your character has beneficial <b>Abilities or Classes</b> you can choose one of them and gain additional dice <b>equal to the level</b> of the chosen one.<br><br>You <b>gain one</b> additional dice or <b>loose one</b> if your character has at least one matching trait. Helping and hindering traits cancel each other out no matter how many of each your character has.<br><br>If your character has an ailment that negatively affects a check, the <b>number of dice you roll are halved</b> (rounded up).<br><br>If another character helps your character you also <b>gain an additional dice</b>",
		"rolling-result-tooltip": "Dice Result -> Number of Successes<br>1 -> -1<br>2 -> 0<br>3-5 -> 1<br>6 -> 2"
	}
}

let currentLocale = "DE"

function getTranslation(messageId) {
	return translations[currentLocale][messageId]
}

function updateTranslation() {
	var translation = translations[currentLocale]
	for (const key of Object.keys(translation)) {
		var elements = document.querySelectorAll('[tr="' + key + '"]')
		if (elements == null || elements.length == 0) {
			continue
		}
		elements.forEach(e => e.innerHTML = translation[key])
	}
}

function setLocale(locale) {
	if (Object.keys(translations).includes(locale)) {
		currentLocale = locale
		updateTranslation()
	}
}

function toggleLocale() {
	currentLocale = currentLocale == "DE" ? "EN" : "DE"
	updateTranslation()
}