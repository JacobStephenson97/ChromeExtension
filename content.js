function loaded (parsedInfoArray, FieldID) {
	setTimeout(findFormID, 1000, parsedInfoArray, FieldID)
}
function loadedStrict (parsedInfoArray, FieldID) {
	setTimeout(findFormIDStrict, 1000, parsedInfoArray, FieldID)
}
function loadedInput (parsedInfoArray, FieldID) {
  setTimeout(findInputID, 1000, parsedInfoArray, FieldID)
}
var assetClass = document.getElementById('ctl00_CPH1_ccTransGrid1_rmaAssetInformation_lblClassName').textContent;
//Check how many Mem channels exist, and create fields.
function createMemFields(memChannels) {
  for(let i = 0; i < (memChannels - 1); i++) {
		document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetComponents_ctl02_btnAdd").click();
	}
}

function createProcessorFields(numberOfProcessors) {
	for(let i = 0; i < (numberOfProcessors - 2); i++) {
		document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetComponents_ctl01_btnAdd").click();
	}
}
function createHDDFields(numberOfHDDS) {
	for(let i = 0; i < (numberOfHDDS - 1); i++) {
		document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetComponents_ctl03_btnAdd").click();
	}
}
function createOpticalFields(numberOfHDDS) {
	for(let i = 0; i < (numberOfHDDS - 1); i++) {
		document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetComponents_ctl04_btnAdd").click();
	}
}
function createTestedDate() {
	if(assetClass === "Notebook") {
	document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetComponents_ctl10_btnAdd").click();
	}
	else if (assetClass === "PC") {
	document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetComponents_ctl08_btnAdd").click();
	}
}
function clickSave() {
	document.getElementById("ctl00_CPH1_ccTransGrid1_btnAssetInfoSave_input").click();
}

//Get's called later on - fills in values to specific fields.
function selectValues(parsedInfo, fieldID) { 
	var input = document.getElementById(fieldID);
	for (let i = 0; i < input.length; i++) {
		var text = input.options[i].text
		var include = (text.toLowerCase()).includes((parsedInfo.toLowerCase()));
		if (include === true) {
			input.selectedIndex = i;
			break;
		}
	}
}
function selectValuesStrict(parsedInfo, fieldID) { 
	var input = document.getElementById(fieldID);
	for (let i = 0; i < input.length; i++) {
		var text = input.options[i].text
		if (text === parsedInfo) {
			input.selectedIndex = i;
		}
	}
}
//Input text Field Values
function inputValues(parsedInfo, fieldID) {
	var input = document.getElementById(fieldID);
	input.value = parsedInfo;
}
//Find CPU Type Field & Call FilterCPU
function findFormID(parsedInformation, formVariable) {
	var parsedInformationArray = parsedInformation.split(',');
	var results = {};
	var tableNodes = document.getElementById("ctl00_CPH1_ccTransGrid1_tblVariantDesc").children;
	var node1 = tableNodes[0].children[0].children[1].children[1].children[0].children[0].children[0];
	var selectelems = node1.getElementsByTagName("SELECT");
	var formVariableArray = new Array();
	var idMatch;
	var formExists;
	console.log(formVariableArray)
	for (let i = 0; i < selectelems.length; i++) {
		const element = selectelems[i];
		var options = element.children;
		var idString = element.getAttribute("ID");
		idMatch = idString.includes(formVariable);
			if (idMatch === true) {
				formVariableArray.push(idString);
				formExists = true;
		}
	} 
	if (formExists != true) {
		loaded(parsedInformation, formVariable)
    }
	
	for (let i = 0; i < formVariableArray.length; i++) {
		selectValues(parsedInformationArray[i], formVariableArray[i])
	}
}
function findFormIDStrict(parsedInformation, formVariable) {
	var parsedInformationArray = parsedInformation.split(',');
	var results = {};
	var tableNodes = document.getElementById("ctl00_CPH1_ccTransGrid1_tblVariantDesc").children;
	var node1 = tableNodes[0].children[0].children[1].children[1].children[0].children[0].children[0];
	var selectelems = node1.getElementsByTagName("SELECT");
	var formVariableArray = new Array();
	var idMatch;
	var formExists;
	for (let i = 0; i < selectelems.length; i++) {
		const element = selectelems[i];
		var options = element.children;
		var idString = element.getAttribute("ID");
		idMatch = idString.includes(formVariable);
			if (idMatch === true) {
				formVariableArray.push(idString);
				formExists = true;
		}
	}
	if (formExists != true) {
		loadedStrict(parsedInformation, formVariable)
    } 
	for (let i = 0; i < formVariableArray.length; i++) {
		selectValuesStrict(parsedInformationArray[i], formVariableArray[i])
	}
}
//Find Input field
function findInputID(parsedInformation, formVariable) {
	var parsedInformationArray = parsedInformation.split(',');
	var results = {};
	var tableNodes = document.getElementById("ctl00_CPH1_ccTransGrid1_tblVariantDesc").children;
	var node1 = tableNodes[0].children[0].children[1].children[1].children[0].children[0].children[0];
	var selectelems = node1.getElementsByTagName("INPUT");
	var formVariableArray = new Array();
	var formExists;
	for (let i = 0; i < selectelems.length; i++) {
		const element = selectelems[i];
		var options = element.children;
		var idString = element.getAttribute("ID");
		var idMatch = idString.includes(formVariable);
		var idMatch2 = idString.includes('TextBox')
			if (idMatch === true && idMatch2 === true) {
				formExists = true;
				formVariableArray.push(idString);
		}
	} 
	if (formExists != true) {
		loadedInput(parsedInformation, formVariable)
    } 
	for (let i = 0; i < formVariableArray.length; i++) {
		inputValues(parsedInformationArray[i], formVariableArray[i])
	}
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request['msg'] == "serialNumber") {
			var parentSerial = document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetInformation_txtSerialNumber").value;
			sendResponse(parentSerial)
		}
	}
);