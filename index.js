var missionplaylistdb = document.implementation.createDocument(null, "MissionPlaylists");
missionplaylistdb.documentElement.setAttribute("version", "4");
crosstitle = document.createElement("CrossTitle");
const playlistBase = document.createElement("Playlist");
const maplistBase = document.createElement("MapList");

insertSkullControls();
readSettings();

for (const GAME in MISSIONS) {
	missionplaylistdb.documentElement.appendChild(document.createElement(GAME));
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
			var missions = shuffleList(lmOut[0]).slice(0, missionCount * playlistCount); // TODO: force playlistCount === 22?
			var availableSkulls = listSkulls(false);
			availableSkulls.delete("prophet_birthday_party");
			var bosses = lmOut[1];

			for (let m = missionCount; m <= missions.length; m += missionCount + 1) {
				let chosenBoss = structuredClone(bosses[0]);
				bosses.shift();
				chosenBoss.boss = true;
				missions.splice(m, 0, chosenBoss);
			}
			for (let m = 0; m < missions.length; m += 2) { // insert mombasa_streets
				missions.splice(m, 0, structuredClone(MISSIONS.halo3odst[0]));
				missions[m].game = "halo3odst";
				missions[m].skulls = new Set();
				if (m !== 0) {
					missions[m].insertionpoint = randomIntRange(1, 6);
				}
			}
			console.log("Missions for roguelike playlist " + p + " shuffled");
		} else {
			var missions = shuffleList(listMissions()).slice(0, missionCount);
			console.log("Missions for playlist " + p + " shuffled");
		}
		for (m = 0; m <= missions.length - 1; m++) { // MISSION LOOP BEGIN
			if (mode == "rogue") {
				if (m > 1) {
					missions[m].skulls = new Set(missions[m - 1].skulls);
					if (missions[m].id === "mombasa_streets") {
						if (missions[m - 1].boss) {
							switch (globalDifficulty) {
								case "_campaign_difficulty_level_normal":
									skullMove(missions[m - 1].skulls, availableSkulls);
									break;
								case "_campaign_difficulty_level_hard":
									skullMove(missions[m - 1].skulls, availableSkulls);
									skullMove(missions[m - 1].skulls, availableSkulls);
									break;
								case "_campaign_difficulty_level_impossible":
									skullMove(missions[m - 1].skulls, availableSkulls);
									skullMove(missions[m - 1].skulls, availableSkulls);
									skullMove(missions[m - 1].skulls, availableSkulls);
									break;
							}
						} else {
							skullMove(availableSkulls, missions[m].skulls);
						}
					}
				}
				if (missions[m].boss && missions[m].id == "regret") {
					missions[m].skulls.add("prophet_birthday_party");
				}
			} else {
				switch (skullMode) {
					case "randomSkulls":
						listSkulls(true).forEach(skull => {
							missions[m].skulls.add(skull);
						})
						break;
					case "incrementalSkulls":
						if (m > 1) {
							listSkulls(true, missions[m - 1].skulls).forEach(skull => {
								missions[m].skulls.add(skull);
							})
						}
						break;
					case "fixedSkulls":
						listSkulls().forEach(skull => {
							missions[m].skulls.add(skull);
						})
						break;
				}
			}
		} // MISSION LOOP END
		console.log(missions);
		for (m = 0; m <= missions.length - 1; m++) { // PARSE INTO XML AND CLEANUP
			let missionElement = document.createElement("Map");
			missionElement.id = "_map_id_" + missions[m].game + "_" + missions[m].id;
			missionElement.setAttribute("diffID", missions[m].diffID);
			typeof missions[m].insertionpoint === "number" ? missionElement.setAttribute("insertionpoint", missions[m].insertionpoint) : null;
			if (missions[m].skulls.size >= 1) {
				var skullList = document.createElement("SkullList");
				missions[m].skulls.forEach(s => {
					let skullElement = document.createElement("Skull");
					skullElement.id = "_skull_" + s;
					skullList.appendChild(skullElement);
				})
				missionElement.appendChild(skullList);
			}
			maplist.appendChild(missionElement);
			if (m !== missions.length - 1
				&& missions[m].game === missions[m + 1].game
				&& typeof missions[m].skulls === typeof missions[m + 1].skulls
				&& typeof missions[m].skulls !== "undefined"
			) { // CUTSCENE CHECK
				if (missions[m].diffID !== missions[m + 1].diffID
					|| Array.from(missions[m].skulls).sort().toString() !== Array.from(missions[m + 1].skulls).sort().toString()
				) {
					console.log("CUTSCENE TIME");
					let availableCutscenes = [];
					for (const game of getGames(CUTSCENES)) {
						if (game !== missions[m].game) {
							availableCutscenes.push(CUTSCENES[game].map(m => game + "_" + m.id));
						}
					}
					if (availableCutscenes.length !== 0) {
						let cutscene = availableCutscenes.flat()[randomIntRange(availableCutscenes.length)];
						let missionElement = document.createElement("Map");
						missionElement.id = "_map_id_" + cutscene;
						console.log(cutscene);
						maplist.appendChild(missionElement);
					}
				}
			}
		} // END PARSE
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
