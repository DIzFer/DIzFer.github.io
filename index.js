var missionplaylistdb = document.implementation.createDocument(null, "MissionPlaylists");
missionplaylistdb.documentElement.setAttribute("version", "4");
crosstitle = document.createElement("CrossTitle");
const playlistBase = document.createElement("Playlist");
const maplistBase = document.createElement("MapList");

insertSkullControls();
readSettings();

for (const _GAME in GAMES) {
	missionplaylistdb.documentElement.appendChild(document.createElement(_GAME));
}

function generatePlaylists(mode = null) {

	if (mode == "rogue") {
		var playlistTitle = "Like a Rogue in Mombasa";
	} else {
		var playlistTitle = document.querySelector("input#playlistTitle").value;
	}

	const missionCount = parseInt(document.querySelector("input#missionCount").value);
	const playlistCount = document.querySelector("#playlistCount").value;
	const includeCutscenes = document.querySelector("input#includeCutscenes").checked;
	const allowDupes = document.querySelector("input#allowDupes").checked;
	const globalDifficulty = document.querySelector("input[name=difficulty]:checked").value;
	const skullMode = document.querySelector("input[name=skullMode]:checked").value;
	const h1 = document.querySelector("input#halo1").checked;
	const h2 = document.querySelector("input#halo2").checked;
	const h3 = document.querySelector("input#halo3").checked;
	const odst = document.querySelector("input#halo3odst").checked;
	const reach = document.querySelector("input#haloreach").checked;
	const h4 = document.querySelector("input#halo4").checked;

	const date = new Date();
	const playlistIDBase = date.toISOString();

	const playlistDescriptionArray = setupPlaylistDescription({
		"mode": mode,
		"missionCount": missionCount,
		"playlistCount": playlistCount,
		"includeCutscenes": includeCutscenes,
		"allowDupes": allowDupes,
		"globalDifficulty": globalDifficulty,
		"skullMode": skullMode,
		"h1": h1,
		"h1": h1,
		"h2": h2,
		"h3": h3,
		"odst": odst,
		"reach": reach,
		"h4": h4,
	});

	if (mode == "rogue") {
		console.log("Beginning Like a Rogue in Mombasa");
		var playlistLoops = 1;
	} else {
		console.log("Beginning standard generation");
		var playlistLoops = playlistCount;
	}
	for (let p = 1; p <= playlistLoops; p++) {
		var maplist = maplistBase.cloneNode();
		var playlist = playlistBase.cloneNode();

		if (mode == "rogue") {
			const lmOut = listMissions("rogue");
			var chosenMissions = lmOut[0];
			var bossMissions = lmOut[1];

			for (let m = missionCount; m <= chosenMissions.length; m += missionCount + 1) {
				chosenMissions.splice(m, 0, "BOSS");
			}
			for (let m = 0; m < chosenMissions.length; m += 2) {
				if (m == 0) {
					chosenMissions.splice(m, 0, "halo3odst_mombasa_streets_0");
				} else {
					chosenMissions.splice(m, 0, "halo3odst_mombasa_streets_" + randomIntRange(1, 6));
				}
			}
			console.log("Missions for roguelike playlist " + p + " shuffled");
		} else {
			var chosenMissions = listMissions();
			console.log("Missions for playlist " + p + " shuffled");
		}
		console.log(chosenMissions);

		var previousSkulls = new Set();
		for (m = 0; m <= chosenMissions.length - 1; m++) {
			var missionElement = document.createElement("Map");
			if (chosenMissions[m].startsWith("halo3odst_mombasa_streets")) {
				missionElement.setAttribute("id", "_map_id_halo3odst_mombasa_streets");
				missionElement.setAttribute("insertionpoint", chosenMissions[m].slice(-1));
				if (mode == "rogue" && m !== 0) {
					var availableSkulls = shuffleList(Array.from(listSkulls(false, new Set(previousSkulls))));
					previousSkulls.add(availableSkulls[0]);
				}
			} else {
				missionElement.setAttribute("id", "_map_id_" + chosenMissions[m]);
			}
			missionElement.setAttribute("diffID", globalDifficulty)
			if (skullMode !== "noSkulls" || mode == "rogue") {
				var skullList = document.createElement("SkullList");
				var skullListModified = false;
				var difficultyModified = false;
			}
			if (mode == "rogue") {
				previousSkulls.forEach(skull => {
					var skullElement = document.createElement("Skull");
					skullElement.id = "_skull_" + skull;
					skullList.appendChild(skullElement);
					skullListModified = true;
				})
				missionElement.appendChild(skullList);
				if (chosenMissions[m].endsWith("BOSS")) {
					missionElement.setAttribute("id", "_map_id_" + bossMissions.pop());
					switch (missionElement.getAttribute("id")) {
						case "_map_id_halo3_the_ark":
							missionElement.setAttribute("insertionpoint", 1);
							break;
						case "_map_id_halo3_the_covenant":
							missionElement.setAttribute("insertionpoint", 1);
							break;
						case "_map_id_halo3odst_coastal_highway":
							missionElement.setAttribute("insertionpoint", 1);
							break;
						case "_map_id_halo4_infinity":
							missionElement.setAttribute("insertionpoint", 2);
							break;
						case "_map_id_halo2_regret":
							var rocknroll = document.createElement("Skull");
							rocknroll.id = "_skull_prophet_birthday_party";
							rockList = missionElement.querySelector("SkullList");
							if (rockList.querySelector("skull#_skull_prophet_birthday_party") === null) {
								rockList.appendChild(rocknroll);
							};
							break;
					}
					let previousSkullsArray = Array.from(previousSkulls);
					let skullsToRemove = [];
					switch (globalDifficulty) {
						case "_campaign_difficulty_level_easy":
							missionElement.setAttribute("diffID", "_campaign_difficulty_level_normal");
							difficultyModified = true;
							break;
						case "_campaign_difficulty_level_normal":
							missionElement.setAttribute("diffID", "_campaign_difficulty_level_hard");
							difficultyModified = true;
							skullsToRemove.push(previousSkullsArray[randomIntRange(previousSkullsArray.length)]);
							break;
						case "_campaign_difficulty_level_hard":
							missionElement.setAttribute("diffID", "_campaign_difficulty_level_impossible");
							difficultyModified = true;
							skullsToRemove.push(previousSkullsArray[randomIntRange(previousSkullsArray.length)]);
							skullsToRemove.push(previousSkullsArray[randomIntRange(previousSkullsArray.length)]);
							break;
						case "_campaign_difficulty_level_hard":
							skullsToRemove.push(previousSkullsArray[randomIntRange(previousSkullsArray.length)]);
							skullsToRemove.push(previousSkullsArray[randomIntRange(previousSkullsArray.length)]);
							skullsToRemove.push(previousSkullsArray[randomIntRange(previousSkullsArray.length)]);
							break;
					}
					skullsToRemove.forEach(s => previousSkulls.delete(s));
				}
			} else {
				switch (skullMode) {
					case "randomSkulls":
						listSkulls(true).forEach(skull => {
							var skullElement = document.createElement("Skull");
							skullElement.id = "_skull_" + skull;
							skullList.appendChild(skullElement);
							skullListModified = true;
						})
						missionElement.appendChild(skullList);
						break;
					case "incrementalSkulls":
						listSkulls(true, previousSkulls).forEach(skull => {
							previousSkulls.add(skull);
							var skullElement = document.createElement("Skull");
							skullElement.id = "_skull_" + skull;
							skullList.appendChild(skullElement);
							skullListModified = true;
						})
						missionElement.appendChild(skullList);
						break;
					case "fixedSkulls":
						listSkulls().forEach(skull => {
							var skullElement = document.createElement("Skull");
							skullElement.id = "_skull_" + skull;
							skullList.appendChild(skullElement);
						})
						missionElement.appendChild(skullList);
						break;
				}
				skullList ? console.log(skullList.childElementCount + " skulls for mission " + chosenMissions[m].replaceAll("_map_id_", "")) : null;
			}
			if (m !== 0
				&& chosenMissions[m - 1].slice(4, 6) == chosenMissions[m].slice(4, 6)
				&& (skullListModified || difficultyModified)) {
				console.log(chosenMissions[m].split("_")[0]);
				var cutsceneFix = document.createElement("Map");
				var availableCutscenes = [];
				for (const game of getGames(CUTSCENES)) {
					if (game !== chosenMissions[m].split("_")[0]) {
						availableCutscenes.push(CUTSCENES[game].map(m => game + "_" + m));
					}
				}
				var cutscene = availableCutscenes.flat()[randomIntRange(availableCutscenes.length)];
				cutsceneFix.setAttribute("id", "_map_id_" + cutscene);
				cutsceneFix.setAttribute("diffID", globalDifficulty)
				maplist.appendChild(cutsceneFix);
				console.log("CUTSCENE TIME");
				console.log(cutscene);
			}
			maplist.appendChild(missionElement);
		}
		playlist.appendChild(maplist);
		playlist.setAttribute("id", playlistIDBase + "-" + p);
		playlist.setAttribute("name", playlistTitle + " " + p);
		playlist.setAttribute("desc", playlistDescriptionArray.join(", "));
		crosstitle.appendChild(playlist);
	}

	missionplaylistdb.documentElement.appendChild(crosstitle);
	var missionplaylistdbText = prepareXML(missionplaylistdb);

	generatedfile = new File([missionplaylistdbText], "missionplaylistdb.xml", {type: "text/xml",});
	document.querySelector("#download").href = URL.createObjectURL(generatedfile);
	document.querySelector("#download").removeAttribute("hidden");
}
