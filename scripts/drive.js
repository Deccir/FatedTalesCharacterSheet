// Based on https://developers.google.com/drive/picker/guides/sample
//	-> https://github.com/googleworkspace/browser-samples/blob/main/drive/picker/helloworld.html
// https://developers.google.com/identity/oauth2/web/guides/use-token-model
// 	-> hier alle scopes https://developers.google.com/identity/protocols/oauth2/scopes
// https://developers.google.com/identity/oauth2/web/guides/migration-to-gis#the_new_way
// Picker Api: https://developers.google.com/drive/picker/reference#picker-builder
// drive api https://developers.google.com/drive/api/reference/rest/v3/files/create
// gapi quickstart https://developers.google.com/drive/api/quickstart/js

const SCOPES = "https://www.googleapis.com/auth/drive.file";
const CLIENT_ID = "914065607254-fj4afknru3nf15rqkd5ib9q46ulnjlq1.apps.googleusercontent.com";
const APP_ID = "914065607254";

let tokenClient;
let accessToken = null;
let pickerInited = false;
let gisInited = false;

let googleDriveSaveFile = null;
let googleDriveSaveFolder = null;

//#region general

function gapiLoaded() {
	gapi.load("client:picker", initializePicker);
}

async function initializePicker() {
	await gapi.client.load("https://www.googleapis.com/discovery/v1/apis/drive/v3/rest");
	pickerInited = true;
	googleApiInitialized();
}

function gisLoaded() {
	tokenClient = google.accounts.oauth2.initTokenClient({
		client_id: CLIENT_ID,
		scope: SCOPES,
		error_callback: (err) => {
			console.error(err)
			showConnectButton()
			setLoading(false)

			toast(getTranslation("token-client-error"), 'error', 5)
		}
	});
	gisInited = true;
	googleApiInitialized();
}

function googleApiInitialized() {
	if ((gisInited && pickerInited) != true) {
		return
	}

	let existingConnection = loadFromLocalStorage("googleDriveConnection")
	googleDriveSaveFile = loadFromLocalStorage("googleDriveSaveFile")

	if (!existingConnection) {
		showConnectButton()
		return
	}

	tokenClient.callback = (response) => {
		onTokenReceived(response)
		if (googleDriveSaveFile) {
			loadOnStartFromGoogleDrive()
		}
	}
	tokenClient.requestAccessToken({ prompt: "" });
}

//#endregion general

//#region gd-connection

function onTokenReceived(response) {
	if (response.error !== undefined) {
		throw (response);
	}
	accessToken = response.access_token;

	showDisconnectButton()

	saveToLocalStorage("googleDriveConnection", response)
}

function connectToGoogleDrive() {
	setLoading(true)
	tokenClient.callback = (response) => {
		onTokenReceived(response)
		setLoading(false)
	}

	if (accessToken === null) {
		// Prompt the user to select a Google Account and ask for consent to share their data
		// when establishing a new session.
		tokenClient.requestAccessToken({ prompt: "consent" });
	} else {
		// Skip display of account chooser and consent dialog for an existing session.
		tokenClient.requestAccessToken({ prompt: "" });
	}
}

function disconnectFromGoogleDrive() {
	showConnectButton()

	if (accessToken) {
		accessToken = null;
		google.accounts.oauth2.revoke(accessToken);
	}

	unloadCurrentFile()

	googleDriveSaveFolder = null

	saveToLocalStorage("googleDriveSaveFile", null)
	saveToLocalStorage("googleDriveConnection", null)
}

function unloadCurrentFile() {
	googleDriveSaveFile = null
	hideShareButton()
}

function showConnectButton() {
	document.getElementById("gd-authorize-button").classList.remove("hidden")
	document.getElementById("gd-signout-button").classList.add("hidden")
	document.getElementById("gd-load-button").classList.add("hidden")
	document.getElementById("gd-save-button").classList.add("hidden")
}

function showDisconnectButton() {
	document.getElementById("gd-authorize-button").classList.add("hidden")
	document.getElementById("gd-signout-button").classList.remove("hidden")
	document.getElementById("gd-load-button").classList.remove("hidden")
	document.getElementById("gd-save-button").classList.remove("hidden")
	recalculateAccordionMaxHeight("google-drive-options", ["save-management"])
}

function gdFileConnected() {
	document.getElementById("gd-share-button").classList.remove("hidden")
	recalculateAccordionMaxHeight("google-drive-options", ["save-management"])
	document.getElementById("import-gd-warning").classList.remove("hidden")
}

function hideShareButton() {
	document.getElementById("gd-share-button").classList.add("hidden")
	document.getElementById("import-gd-warning").classList.add("hidden")
}

//#endregion gd-connection

//#region load_sheet

function loadOtherFromGoogleDrive() {
	document.getElementById("load-gd-dialog").showModal();
}

function closeLoadFromGoogleDriveDialog(proceed) {
	document.getElementById("load-gd-dialog").close();
	if (proceed) {
		createLoadPicker()
	}
}

function loadOnStartFromGoogleDrive() {
	if ((pickerInited && gisInited && accessToken != null && googleDriveSaveFile != null) == false) {
		return
	}

	gapi.client.drive.files.get({
		fileId: googleDriveSaveFile.id,
		alt: "media"
	}).then((response) => {
		restoreSheet(JSON.parse(response.body))
		gdFileConnected()
		setLoading(false)
	}).catch((error) => {
		toast(getTranslation("gapi-client-get-error"), 'error', 5)
		restoreSheetFromLocalstorage()
		googleDriveSaveFile = null
		hideShareButton()
		setLoading(false)
	});
}

function loadPickerCallback(data) {
	if (data.action === google.picker.Action.PICKED) {
		setLoading(true)
		const fileId = data[google.picker.Response.DOCUMENTS][0][google.picker.Document.ID];

		gapi.client.drive.files.get({
			fileId: fileId,
			alt: "media"
		}).then((fileResponse) => {
			gapi.client.drive.files.get({
				fileId: fileId,
				fields: "name, id",
			}).then((metaResponse) => {
				setLoading(false)
				googleDriveSaveFile = metaResponse.result
				saveToLocalStorage("googleDriveSaveFile", googleDriveSaveFile)
				if (fileResponse.body) {
					restoreSheet(JSON.parse(fileResponse.body))
					gdFileConnected()
					return
				}
				restoreSheet({})
				toast(getTranslation("gapi-client-json-error"), 'error', 5)
			});
		}).catch((error) => {
			setLoading(true)
			console.error(error)
			toast(getTranslation("gapi-client-get-error"), 'error', 5)
		});
	}
}

function createLoadPicker() {
	const rootView = new google.picker.DocsView(google.picker.ViewId.DOCS).setIncludeFolders(true).setParent("root")
	// const allFileView = new google.picker.DocsView(google.picker.ViewId.DOCS).setIncludeFolders(true)

	const picker = new google.picker.PickerBuilder()
		.setAppId(APP_ID)
		.setOAuthToken(accessToken)
		.addView(rootView)
		// .addView(allFileView)
		.setCallback(loadPickerCallback)
		.build();
	picker.setVisible(true)
}

//#endregion load_sheet

//#region save_sheet

function openSaveAsToGoogleDriveDialog() {
	document.getElementById("save-to-gd-dialog").showModal();
}

function closeSaveAsToGoogleDriveDialog(proceed) {
	document.getElementById("save-to-gd-dialog").close()

	if (!proceed) {
		document.getElementById("gd-save-filename").value = ""
		document.getElementById("gd-save-foldername").value = "";
		googleDriveSaveFolder = null
		return
	}

	document.getElementById("save-to-gd-dialog").close()
	const form = createSheetFormData(getSaveFile(), {
		name: document.getElementById("gd-save-filename").value + ".ftrpg",
		mimeType: "application/json",
		parents: [googleDriveSaveFolder.id],
	})
	uploadFile(form, null)
		.then((response) => {
			if (response.status != 200) {
				toast(getTranslation("gapi-client-save-error"), 'error', 5)
				document.getElementById("save-to-gd-dialog").showModal()
				console.log("error")
				return;
			}

			response.json().then((meta) => {
				googleDriveSaveFile = { id: meta.id, name: meta.name }
				gdFileConnected()
				saveToLocalStorage("googleDriveSaveFile", googleDriveSaveFile)
				document.getElementById("gd-save-filename").value = ""
				document.getElementById("gd-save-foldername").value = "";
				googleDriveSaveFolder = null
				document.getElementById("save-to-gd-dialog").close()
			})
		})
}

function saveToGoogleDrive(saveData) {
	if ((pickerInited && gisInited && accessToken != null && googleDriveSaveFile != null) == false) {
		return
	}
	let form = createSheetFormData(saveData)
	uploadFile(form, googleDriveSaveFile.id).then((response) => {
		if (response.status != 200) {
			toast(getTranslation("gapi-client-save-error"), 'error', 5)
			console.log("error")
			return;
		}
	})
}

function createSavePicker() {
	document.getElementById("save-to-gd-dialog").close();

	const folderView = new google.picker.DocsView(google.picker.ViewId.FOLDERS)
		.setIncludeFolders(true)
		.setSelectFolderEnabled(true)
		.setParent("root")

	const picker = new google.picker.PickerBuilder()
		.setAppId(APP_ID)
		.setOAuthToken(accessToken)
		.addView(folderView)
		.setCallback(savePickerCallback)
		.build();
	picker.setVisible(true)
}

function savePickerCallback(data) {
	// this function is also called with the data.action = "loaded"

	if (data.action === google.picker.Action.CANCEL) {
		document.getElementById("save-to-gd-dialog").showModal();
		return
	}
	if (data.action === google.picker.Action.PICKED) {
		document.getElementById("save-to-gd-dialog").showModal();
		const fileId = data[google.picker.Response.DOCUMENTS][0][google.picker.Document.ID];

		setLoading(true)
		gapi.client.drive.files.get({
			fileId: fileId,
			fields: "name, id",
		}).then((res) => {
			googleDriveSaveFolder = res.result

			setLoading(false)
			document.getElementById("gd-save-foldername").value = res.result.name;
			updateActivateGDSaveButton()
		}).catch((error) => {
			setLoading(false)
		});
		return
	}
}

function setDefaultSaveFolder() {
	googleDriveSaveFolder = { name: "root", id: "root" }
	document.getElementById("gd-save-foldername").value = googleDriveSaveFolder.name;
	updateActivateGDSaveButton()
}

function updateActivateGDSaveButton() {
	let closeButton = document.getElementById("close-gd-save-as-dialog")
	let filename = document.getElementById("gd-save-filename").value

	if (googleDriveSaveFolder && filename) {
		closeButton.removeAttribute("disabled")
	}
	else {
		closeButton.setAttribute("disabled", true)
	}
}

//#endregion save_sheet

//#region share

function copySharableLinkToClipboard() {
	setLoading(true)
	gapi.client.drive.files.get({
		fileId: googleDriveSaveFile.id,
		fields: "permissions, webViewLink",
	}).then(async (fileResponse) => {
		for (const permission of fileResponse.result.permissions) {
			if (permission.role == "reader" && permission.type == "anyone") {
				copyToClipboard(fileResponse.result.webViewLink)
				setLoading(false)
				return
			}
		}

		await gapi.client.drive.permissions.create({
			fileId: googleDriveSaveFile.id
		}, {
			type: "anyone",
			role: "reader"
		});

		const updatedFileResponse = await gapi.client.drive.files.get({
			fileId: googleDriveSaveFile.id,
			fields: "permissions, webViewLink",
		});
		copyToClipboard(updatedFileResponse.result.webViewLink);
		setLoading(false);

	}).catch((error) => {
		console.log(error)
		setLoading(false)
	});

}


//#endregion share

//#region helper_because_the_api_sucks

function createSheetFormData(content, metadata) {
	let file = new Blob([JSON.stringify(content)], { type: "application/json" });
	const form = new FormData();
	form.append("metadata", new Blob([metadata ? JSON.stringify(metadata) : ""], { type: "application/json" }))
	form.append("file", file);

	return form
}

async function uploadFile(form, id) {
	setLoading(true)
	return fetch("https://www.googleapis.com/upload/drive/v3/files" + (id ? "/" + id : "") + "?uploadType=multipart&supportsAllDrives=true", {
		method: id ? "PATCH" : "POST",
		headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
		body: form,
	}).then(response => {
		setLoading(false)
		return response
	});
}

//#endregion helper_because_the_api_sucks