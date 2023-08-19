function reset() {
	location.href = "/";
}

function randomIntRange(max, min = 0) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleList(list) {
	// https://bost.ocks.org/mike/shuffle/
	if (list.length != undefined) {
		var remaining = list.length;
	} else if (list.size != undefined) {
		var remaining = list.size;
	}
	var t, i;
	while (remaining) {
		i = Math.floor(Math.random() * remaining--);
		t = list[remaining];
		list[remaining] = list[i];
		list[i] = t;
	}
	return list;
}

function listMissions(specialMode = null) {
	var missionList = [];
	var bossList = [];
	const playlistCount = document.querySelector("input#playlistCount").value;
	var missionCount = document.querySelector("input#missionCount").value;
	if (specialMode == "rogue") {
		missionCount *= playlistCount;
	}
	for (const _GAME in GAMES) {
		if (document.querySelector("input#" + _GAME).checked) {
			missionList = missionList.concat(GAMES[_GAME].flatMap(m => {
				if ((_GAME == "halo3odst" && specialMode == "rogue" && m.startsWith("mombasa_streets")) || BOSS_MISSIONS[_GAME].includes(m)) {
					return []
				} else {
					return _GAME + "_" + m
				}
			}))
			if (specialMode == "rogue") {
				bossList = bossList.concat(BOSS_MISSIONS[_GAME].map(m => _GAME + "_" + m));
			}
			if (document.querySelector("input#includeCutscenes").checked && _GAME !== "halo1" ) {
				missionList = missionList.concat(CUTSCENES[_GAME].map(m => _GAME + "_" + m))
			}
		}
	}
	if (document.querySelector("input#allowDupes").checked) {
		var n = missionCount - 1;
		const singleMissionList = missionList;
		while (n) {
			missionList = missionList.concat(singleMissionList);
			n--;
		}
	}
	const shuffledMissions = shuffleList(missionList).slice(0, missionCount);
	if (specialMode == "rogue") {
		return [shuffledMissions, (shuffleList(bossList).slice(0, playlistCount))];
	} else {
		return shuffledMissions;
	}
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

function listSkulls(random = false, prefill = new Set()) {
	var skullsList = prefill;
	document.querySelectorAll(".skullContainer input").forEach(checkbox => {
		if (checkbox.checked) {
			if (random) {
				if (Math.random() < .2) {
					skullsList.add(checkbox.id);
				}
			} else {
				skullsList.add(checkbox.id);
			}
		}
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

function setupPlaylistDescription(settings) {
	var playlistDescriptionArray = [];
	settings.mode ? playlistDescriptionArray.push(HUMANIZER_OBJECT[settings.mode]) : null;
	settings.h1 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo1"]) : null;
	settings.h2 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo3"]) : null;
	settings.h3 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo3"]) : null;
	settings.odst ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo3odst"]) : null;
	settings.reach ? playlistDescriptionArray.push(HUMANIZER_OBJECT["haloreach"]) : null;
	settings.h4 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo4"]) : null;
	settings.includeCutscenes ? playlistDescriptionArray.push(HUMANIZER_OBJECT["cutscenes"]) : null;
	playlistDescriptionArray.push(settings.allowDupes ? HUMANIZER_OBJECT["allowDupes"] : HUMANIZER_OBJECT["noDupes"]);
	if (settings.mode == null) {
		playlistDescriptionArray.push(HUMANIZER_OBJECT[settings.skullMode]);
	};
	console.log(playlistDescriptionArray);
	return playlistDescriptionArray;

}
