window.onload = function() {
    loadTabs();
};
var parentSerial;
chrome.tabs.executeScript(null, {file: 'content.js'});
function openTab(tabName, evt) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "")
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function loadTabs() {

    var epsButton = document.getElementById('epsLoadButton');
    var pcButton = document.getElementById('PCButton');
    var laptopButton = document.getElementById('LaptopButton');
    var miscButton = document.getElementById('MiscButton');
    var dsButton = document.getElementById('DSButton');
    
    epsButton.addEventListener("click", function(e) {
        var tabname = e.target.innerHTML;
		openTab(tabname,e);
    });
    pcButton.addEventListener("click", function(e) {
        var tabname = e.target.innerHTML;
		openTab(tabname,e);
    });
    laptopButton.addEventListener("click", function(e) {
        var tabname = e.target.innerHTML;
		openTab(tabname,e);
    });
    miscButton.addEventListener("click", function(e) {
		var tabname = e.target.innerHTML;
		openTab(tabname,e);
    });
    dsButton.addEventListener("click", function(e) {
		var tabname = e.target.innerHTML;
		openTab(tabname,e);
	});
}
// ********************************************************************************************************************************
//VERIFY IF CHECK BOXES ARE ON/OFF
var laptopNoteAmount = 0;
var note = [];
var finishedNotes = [];
var trueFields = 0;

function checkNote(id) {
    var tf = document.getElementById(id).checked
    var noteName = document.getElementById(id).value;
    note.push(tf);
    if (tf === true) {
        finishedNotes.push(noteName);
    } 
}

function checkNotesPC() {
    checkNote("hasCaddy");
    checkNote("noCaddy");
    checkNote("noHDD");
    checkNote("noOptical");
    checkNote("noRam");
    checkNote("noCompu");
    checkNote("compuActive");
    checkNote("econResale");
    checkNote("noPower");
    checkNote("manDS");
    checkNote("foundCD");
    checkNote("ssdEncrypted");
    checkNote("byAL");
    checkNote("byDH");
    checkNote("byJS");
    checkNote("byJW");
    checkNote("byMS");
    
    trueFields = note.filter(Boolean).length;
};


function checkNotesLaptop() {
    checkNote("hasAdapter");
    checkNote("noAdapter");
    checkNote("hasCaddy2");
    checkNote("noCaddy2");
    checkNote("noBattery");
    checkNote("faultyBat");
    checkNote("batRemoved");
    checkNote("noHDD2");
    checkNote("noOptical2");
    checkNote("noRam2");
    checkNote("noCompu2");
    checkNote("compuActive2");
    checkNote("econResale2");
    checkNote("noPower2");
    checkNote("supervisorPass2");
    checkNote("manDS2");
    checkNote("foundCD2");
    checkNote("ssdEncrypted2");
    checkNote("byAL2");
    checkNote("byDH2");
    checkNote("byJS2");
    checkNote("byJW2");
    checkNote("byMS2");
    
    trueFields = note.filter(Boolean).length;
};


document.getElementById('pcNoteSubmit').addEventListener('click', function() {
    checkNotesPC()
    for (let i=0; i < trueFields; i++) {
        chrome.tabs.executeScript(null, {
            code: 'document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetComponents_ctl10_btnAdd").click();'
        });
    }
    chrome.tabs.executeScript(null, {
        code: 'findInputID("'+finishedNotes+'", "_38_0_True");'
    });
    postAssetInfo()
    
});
document.getElementById('laptopNoteSubmit').addEventListener('click', function() {
    checkNotesLaptop()
    for (let i=0; i < trueFields; i++) {
        chrome.tabs.executeScript(null, {
            code: 'document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetComponents_ctl12_btnAdd").click();'
        });
    }
    chrome.tabs.executeScript(null, {
        code: 'findInputID("'+finishedNotes+'", "_38_0_True");'
    });
    postAssetInfo()
});



//VERIFY IF CHECK BOXES ARE ON/OFF
var note2 = [];
var assetInfo = [];
var trueFields2 = 0;

function setAssetInfo(id) {
    var tf = document.getElementById(id).checked
    var noteName = document.getElementById(id).value;
    note2.push(tf);
    if (tf === true) {
        assetInfo.push(noteName);
        console.log(assetInfo);
    } 
}
function checkAssetInfo() {
    setAssetInfo("byAL");
    setAssetInfo("byDH");
    setAssetInfo("byJS");
    setAssetInfo("byJW");
    setAssetInfo("byMS");
    setAssetInfo("byAL2");
    setAssetInfo("byDH2");
    setAssetInfo("byJS2");
    setAssetInfo("byJW2");
    setAssetInfo("byMS2");
    setAssetInfo("gradeA");
    setAssetInfo("gradeB");
    setAssetInfo("gradeC");
    setAssetInfo("gradeF");
    setAssetInfo("gradeA2");
    setAssetInfo("gradeB2");
    setAssetInfo("gradeC2");
    setAssetInfo("gradeF2");

    trueFields2 = note.filter(Boolean).length;
}

function postAssetInfo () {
    checkAssetInfo();
    if (assetInfo[0] === 'Original audit by JS') {
        chrome.tabs.executeScript(null, {
            code: 'document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetInformation_cmbPallets_Input").value = "A100-8278";'
        });
    }
    else if (assetInfo[0] === 'Original audit by DH') {
        chrome.tabs.executeScript(null, {
            code: 'document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetInformation_cmbPallets_Input").value = "A100-8047";'
        });
    }
    chrome.tabs.executeScript(null, {
        code: 'document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetInformation_ddlGrade_Input").value = "'+assetInfo[1]+'";'
    });
    if (assetInfo[1] === "A" || assetInfo[1] === "B" || assetInfo[1] === "C" ) {
        chrome.tabs.executeScript(null, {
            code: 'document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetInformation_ddlNextProcess").selectedIndex = 2;'
        });
        chrome.tabs.executeScript(null, {
            code: 'document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetInformation_ddlComplianceLabel").selectedIndex = 1;'
        });
    }
    else if (assetInfo[1] === "F") {
        chrome.tabs.executeScript(null, {
            code: 'document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetInformation_ddlNextProcess").selectedIndex = 1;'
        });
        chrome.tabs.executeScript(null, {
            code: 'document.getElementById("ctl00_CPH1_ccTransGrid1_rmaAssetInformation_ddlComplianceLabel").selectedIndex = 2;'
        });
    }
    assetInfo.length = 0;
}
//*********************************************************************************************************************************** 
function grabSN(response) {
    parentSerial = response;
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.sendMessage(tabs[0].id, {msg:"serialNumber"}, function(response) {
		grabSN(response);
	});
});


function loadFromEPS() {

    var date = new Date();
    var dateString = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear())
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";    
    var monthName = month[date.getMonth()]
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parseHDDSerial(this);
            parseProcessorModel(this);
            parseProcessorSpeed(this);
            parseMemorySpeed(this);
            parseMemoryFields(this);
            parseMemorySize(this);
            parseProcessorFields(this);
            parseStorageManufacturer(this);
            parseStorageModel(this);
            parseStorageInterface(this);
            parseStorageSpeed(this);
            parseStorageCapacity(this);
            parseOpticalType(this);
            parseStorageFields(this);
            parseOpticalFields(this);
            getHDDRemoved(this);
        }
    };
    //Load the XML File
    request.open("GET", "/Logs/"+monthName+"/makor_"+parentSerial+".xml", true)
    request.send();

    //Parse for the Memory amount
    function parseMemoryFields(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Memory']/component[@name='Manufacturer']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        chrome.tabs.executeScript(null, {
            code: 'createMemFields("'+nodes.length+'");'
        });
    };
    // Parse for # of Processor's
    function parseProcessorFields(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Processor']/component[@name='Manufacturer']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        chrome.tabs.executeScript(null, {
            code: 'createProcessorFields("'+nodes.length+'");'
        });
    };

    // Parse for # of HDD's
    function parseStorageFields(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Drive']/component[@name='Manufacturer']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        chrome.tabs.executeScript(null, {
            code: 'createHDDFields("'+nodes.length+'");'
        });
    };
    // Parse for # of Optical Drives
    function parseOpticalFields(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Optical_Drive']/component[@name='Manufacturer']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        chrome.tabs.executeScript(null, {
            code: 'createOpticalFields("'+nodes.length+'");'
        });
    };
    chrome.tabs.executeScript(null, {
        code: 'setTimeout(createTestedDate, 100);'
    })
    chrome.tabs.executeScript(null, {
        code: 'setTimeout(clickSave, 800);'
    })

    //Parse for the Processor Model
    function parseProcessorModel(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Processor']/component[@name='Model']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var processorModelArray = new Array();
        for (let i = 0; i < (nodes.length - 1); i++) {
            processorModelArray.push(nodes[i].textContent);
        }     
        chrome.tabs.executeScript(null, {
            code: 'findFormID("'+processorModelArray+'", "_4_0_True");'
        });
    };
    //Parse for the Processor Speed
    function parseProcessorSpeed(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Processor']/component[@name='Speed']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var processorSpeedArray = new Array();
        for (let i = 0; i < (nodes.length - 1); i++) {
            processorSpeedArray.push(nodes[i].textContent);
        }
        chrome.tabs.executeScript(null, {
            code: 'findFormID("'+processorSpeedArray+'", "_5_0_True");'
        });
    };
    //Parse for the Memory Speed
    function parseMemorySpeed(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Memory']/component[@name='Type']", xmlDoc);
        var nodes = [];
        var node;
        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var memType = [];
        for (let i = 0; i < (nodes.length - 1); i++) {
            memType.push(nodes[i].textContent)
        }
        if (memType.length > '0') {
            chrome.tabs.executeScript(null, {
            code: 'findFormIDStrict("'+memType+'", "_8_0_True");'
            });
        }
    };
    //Parse for the Memory Size
    function parseMemorySize(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Memory']/component[@name='Size']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var memSize = new Array();
        for (let i = 0; i < (nodes.length - 1); i++) {
            memSize.push(nodes[i].textContent)
        }
        chrome.tabs.executeScript(null, {
            code: 'findFormIDStrict("'+memSize+'", "_9_0_True");'
        });
    };

    //Call getHDDRemoved
    function getHDDRemoved(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Drive']/component[@name='Model']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var memSize = [];
        var memSize2 = [];
        for (let i = 0; i < (nodes.length - 1); i++) {
            memSize.push('No');
            memSize2.push('3');
        }
        if (memSize.length > '0') {
        chrome.tabs.executeScript(null,{
            code: 'findFormID("'+memSize+'" , "_78_0_True");'
        });
        chrome.tabs.executeScript(null,{
            code: 'findFormID("'+memSize2+'", "_81_0_True");'
        });
    }
    }
    //call GetHDDAssignedService

    //Parse for HDD Manufacturer
    function parseStorageManufacturer(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Drive']/component[@name='Manufacturer']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var hddManu = new Array();
        for (let i = 0; i < (nodes.length - 1); i++) {
            hddManu.push(nodes[i].textContent)
        }
        if (hddManu.length > '0') {
        chrome.tabs.executeScript(null, {
            code: 'findFormID("'+hddManu+'", "_84_17_True");'
        });
    }
    };

    //Parse for HDD Model
    function parseStorageModel(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Drive']/component[@name='Model']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var hddModel = new Array();
        for (let i = 0; i < (nodes.length - 1); i++) {
            hddModel.push(nodes[i].textContent)
        }
        if (hddModel.length > '0') {
        chrome.tabs.executeScript(null, {
            code: 'findFormID("'+hddModel+'", "_80_17_True");'
        });
    }
    };

    //Parse for HDD Interface
    function parseStorageInterface(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Drive']/component[@name='Interface']", xmlDoc);
        var nodes = [];
        var node;
        var splitHDD = [];
        var splitHDDArray = [];

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var hddInterface = new Array();
        for (let i = 0; i < (nodes.length - 1); i++) {
            hddInterface.push(nodes[i].textContent)
        }
        chrome.tabs.executeScript(null, {
            code: 'findFormIDStrict("'+hddInterface+'", "_13_0_True");'
        });
    };
    //Parse for HDD SN
    function parseHDDSerial(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Drive']/component[@name='SerialNumber']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var hddModel = new Array();
        for (let i = 0; i < (nodes.length - 1); i++) {
            hddModel.push(nodes[i].textContent)
        }
        if (hddModel.length > '0') {
        chrome.tabs.executeScript(null, {
            code: 'findInputID("'+hddModel+'", "_82_17_True");'
        });
    }
    };
    chrome.tabs.executeScript(null, {
        code: 'findInputID("'+dateString+'", "_265_0_False");'
    });
    //Parse for HDD Speed
    function parseStorageSpeed(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Drive']/component[@name='Type']", xmlDoc);
        var nodes = [];
        var node;
        var splitHDD = [];
        var splitHDDArray = [];

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var hddInterface = [];
        for (let i = 0; i < (nodes.length - 1); i++) {
            hddInterface.push(nodes[i].textContent)
        }
        chrome.tabs.executeScript(null, {
            code: 'findFormID("'+hddInterface+'", "_14_0_True");'
        });
    };
    //Parse for HDD Capacity
    function parseStorageCapacity(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Drive']/component[@name='Size']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var hddModel = new Array();
        for (let i = 0; i < (nodes.length - 1); i++) {
            hddModel.push(nodes[i].textContent)
        }
        chrome.tabs.executeScript(null, {
            code: 'findFormID("'+hddModel+'", "12_0_True");'
        });
    };
    //Parse Opical Drive
    function parseOpticalType(xml) {
        var xmlDoc = xml.responseXML;
        var resultset = xmlDoc.evaluate("//components[@name='Optical_Drive']/component[@name='Description']", xmlDoc);
        var nodes = [];
        var node;

        while (node !== null) {
            node = resultset.iterateNext();
            nodes.push(node).nodeValue;
        }
        var hddModel = new Array();
        for (let i = 0; i < (nodes.length - 1); i++) {
            hddModel.push(nodes[i].textContent)
        }
        if(hddModel.length > 0) {
            chrome.tabs.executeScript(null, {
            code: 'findFormID("'+hddModel+'", "89_0_True");'
            });
        }
    };
}
document.getElementById('fillProcessor').addEventListener('click', hello);