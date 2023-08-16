function reset() {
	location.href = "/";
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

function listMissions() {
	var missionList = [];
	var missionCount = document.querySelector("input#missionCount").value;
	for (const _GAME in GAMES) {
		if (document.querySelector("input#" + _GAME).checked) {
			missionList = missionList.concat(GAMES[_GAME].map(m => _GAME + "_" + m))
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
	return shuffleMissionList(missionList).slice(0, missionCount);
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
