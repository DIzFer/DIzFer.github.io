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

function getGames(pool) {
	let gamesList = [];
	for (const game in pool) {
		document.querySelector("input#" + game).checked ? gamesList.push(game) : null;
	}
	return gamesList;
}

function listMissions(specialMode = null) {
	var missionList = [];
	var bossList = [];
	const playlistCount = document.querySelector("input#playlistCount").value;
	const missionCount = document.querySelector("input#missionCount").value;
	const globalDifficulty = document.querySelector("input[name=difficulty]:checked").value;
	for (const GAME of getGames(MISSIONS)) {
		missionList = missionList.concat(MISSIONS[GAME].flatMap(m => {
			if ((GAME == "halo3odst" && specialMode == "rogue" && m.id === "mombasa_streets") || BOSS_MISSIONS[GAME].includes(m)) {
				return []
			} else {
				return {
					id: m.id,
					game: GAME,
					diffID: globalDifficulty,
					skulls: new Set()
				}
			}
		}))
		if (specialMode == "rogue") {
			bossList = bossList.concat(BOSS_MISSIONS[GAME].map(m => {
				var m = {
					id: m.id,
					game: GAME,
					diffID: globalDifficulty,
					skulls: new Set()
				};
				switch (globalDifficulty) {
					case "_campaign_difficulty_level_easy":
						m.diffID = "_campaign_difficulty_level_normal";
						break;
					case "_campaign_difficulty_level_normal":
						m.diffID = "_campaign_difficulty_level_hard";
						break;
					case "_campaign_difficulty_level_hard":
						m.diffID = "_campaign_difficulty_level_impossible";
						break;
				}
				return m
			}));
		}
		if (document.querySelector("input#includeCutscenes").checked && GAME !== "halo1" ) {
			missionList = missionList.concat(CUTSCENES[GAME].map(m => {
				return {
					id: m.id,
					game: GAME,
					difficulty: globalDifficulty,
					skulls: new Set()
				}
			}))
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
	if (specialMode == "rogue") {
		return [missionList, shuffleList(bossList).slice(0, playlistCount)];
	} else {
		return missionList;
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

function listSkulls(random = false, prefill) {
	var skullsList = new Set(prefill);
	document.querySelectorAll(".skullContainer input").forEach(checkbox => {
		if (checkbox.checked) {
			if (random) {
				if (Math.random() < .15) {
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
function skullMove(originPool, destinationPool, missionPool) {
	const skull = Array.from(originPool)[randomIntRange(originPool.size - 1)]
	originPool.delete(skull);
	destinationPool.add(skull);
}
