function reset() {
	localStorage.clear();
	location.href = "/";
}

function parseCareerDB() {
	cachedCareerDB = localStorage.getItem("careerdb");
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
		console.log("dupes enabled");
		var n = document.querySelector("input#missionCount").value - 1;
		const singleMissionList = missionList;
		while (n) {
			missionList = missionList.concat(singleMissionList);
			n--;
		}
	}
	console.log(missionList);
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
	console.log("Missions shuffled");
	return missionList;
}

function listSkulls() {
	var skullsList = [];
	careerdb.querySelectorAll("Skulls Skull").forEach(skull => skullsList.includes(skull.id) ? null : skullsList.push(skull.id));
	console.log("skulls retrieved");
	document.querySelector('#acrophobia').checked ? null : skullsList.splice(skullsList.indexOf('_skull_boots_off_the_ground'), 1);
	document.querySelector('#bandanna').checked ? null : skullsList.splice(skullsList.indexOf('_skull_bandanna'), 1);
	document.querySelector('#scarab').checked ? null : skullsList.splice(skullsList.indexOf('_skull_scarab'), 1);
	document.querySelector('#iron').checked ? null : skullsList.splice(skullsList.indexOf('_skull_iron'), 1);
	document.querySelector('#foreign').checked ? null : skullsList.splice(skullsList.indexOf('_skull_foreign'), 1);
	document.querySelector('#jacked').checked ? null : skullsList.splice(skullsList.indexOf('_skull_jacked'), 1);
	document.querySelector('#funeral').checked ? null : skullsList.splice(skullsList.indexOf('_skull_grunt_funeral'), 1);
	document.querySelector('#angy').checked ? null : skullsList.splice(skullsList.indexOf('_skull_so_angry'), 1);
	document.querySelector('#blind').checked ? null : skullsList.splice(skullsList.indexOf('_skull_blind'), 1);
	console.log(skullsList);
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
