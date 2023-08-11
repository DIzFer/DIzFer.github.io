function reset() {
	localStorage.clear();
	location.href = "/";
}

function parseCareerDB() {
	const cachedCareerDB = localStorage.getItem("careerdb");
	if (cachedCareerDB !== null) {
		const parser = new DOMParser();
		careerdb = parser.parseFromString(cachedCareerDB, "text/xml");
	}
	console.log("CareerDB parsed");
}

function storeCareerDB() {
	localStorage.setItem("careerdb", this.responseText);
	console.log("CareerDB stored");
	parseCareerDB();
}

function fetchCareerDB() {
	xhr = new XMLHttpRequest();
	xhr.open("GET", "/careerdb.xml");
	xhr.addEventListener("load", storeCareerDB);
	xhr.send();
}

function listMissions() {
	var missionList = [];
	for (const _GAME of GAMES.filter(game => document.querySelector("input#" + game).checked)) {
		const chapterList = careerdb.querySelectorAll(_GAME + " > Chapters > Chapter");
		chapterList.forEach(chapter => missionList.push(chapter.getAttribute("builtInMapId")));
	}
	if (document.querySelector("input#allowDupes").checked) {
		var n = document.querySelector("input#missionCount").value - 1;
		const singleMissionList = missionList;
		while (n) {
			missionList = missionList.concat(singleMissionList);
			n--;
		}
	}
	return missionList;
}

function shuffleMissionList(missionList) {
	// https://bost.ocks.org/mike/shuffle/
	var remaining = missionList.length, t, i;
	while (remaining) {
		i = Math.floor(Math.random() * remaining--);
		t = missionList[remaining];
		missionList[remaining] = missionList[i];
		missionList[i] = t;
	}
	return missionList;
}

function insertSkullControls() {
	for (const skullType in SKULLS) {
		var currentContainer = document.querySelector('#' + skullType);
		for (const skull of SKULLS[skullType]) {
			var currentSkullLabel = document.createElement("label");
			currentSkullLabel.setAttribute("for", skull);
			currentSkullLabel.textContent = skull.replaceAll("_", " ");
			var currentSkullCheckbox = document.createElement("input");
			currentSkullCheckbox.setAttribute("type", "checkbox");
			currentSkullCheckbox.setAttribute("id", skull);
			currentContainer.appendChild(currentSkullLabel);
			currentContainer.appendChild(currentSkullCheckbox);
		};
	};
}

function listSkulls() {
	var skullsList = [];
	document.querySelectorAll(".skullContainer input").forEach(checkbox => {
		checkbox.checked ? skullsList.push("_skull_" + checkbox.id) : null;
	});
	return skullsList;
}

function prepareXML(xmldata) {
	var serializer = new XMLSerializer();
	var xmltext = serializer.serializeToString(xmldata);
	xmltext = xmltext.replaceAll(' xmlns="http://www.w3.org/1999/xhtml"', '');
	for (k in FFS_XML_FIX_LIST) {
		xmltext = xmltext.replaceAll(k, FFS_XML_FIX_LIST[k]);
	}
	return xmltext;
}
