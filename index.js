var missionplaylistdb = document.implementation.createDocument(null, "MissionPlaylists");
missionplaylistdb.documentElement.setAttribute("version", "4");
crosstitle = document.createElement("CrossTitle");
const playlistBase = document.createElement("Playlist");
const maplistBase = document.createElement("MapList");
var generationCount = 0;

insertSkullControls();
readSettings();

for (const _GAME in GAMES) {
	missionplaylistdb.documentElement.appendChild(document.createElement(_GAME));
}

function generatePlaylists() {
	generationCount++;

	const playlistTitle = document.querySelector("input#playlistTitle").value;
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

	var playlistDescriptionArray = [];
	h1 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo1"]) : null;
	h2 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo3"]) : null;
	h3 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo3"]) : null;
	odst ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo3odst"]) : null;
	reach ? playlistDescriptionArray.push(HUMANIZER_OBJECT["haloreach"]) : null;
	h4 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo4"]) : null;
	includeCutscenes ? playlistDescriptionArray.push(HUMANIZER_OBJECT["cutscenes"]) : null;
	playlistDescriptionArray.push(allowDupes ? HUMANIZER_OBJECT["allowDupes"] : HUMANIZER_OBJECT["noDupes"]);
	playlistDescriptionArray.push(HUMANIZER_OBJECT[skullMode]);
	console.log(playlistDescriptionArray);


	for (let i = 1; i <= playlistCount; i++) {
		console.log("Beginning standard generation");

		var maplist = maplistBase.cloneNode();
		var playlist = playlistBase.cloneNode();

		const chosenMissions = listMissions();

		console.log("Missions for playlist " + i + " shuffled");
		console.log(chosenMissions);
		var previousSkulls = new Set();
		for (const _MISSION of chosenMissions) {
			var missionElement = document.createElement("Map");
			if (_MISSION.startsWith("halo3odst_mombasa_streets")) {
				missionElement.setAttribute("id", "_map_id_halo3odst_mombasa_streets");
				missionElement.setAttribute("insertionpoint", _MISSION.at(-1));
			} else {
				missionElement.setAttribute("id", "_map_id_" + _MISSION);
			}
			missionElement.setAttribute("diffID", globalDifficulty)
			switch (skullMode) {
				case "randomSkulls":
					var skullList = document.createElement("SkullList");
					listSkulls(true).forEach(skull => {
						var skullElement = document.createElement("Skull");
						skullElement.id = "_skull_" + skull;
						skullList.appendChild(skullElement);
					})
					missionElement.appendChild(skullList);
					break;
				case "incrementalSkulls":
					var skullList = document.createElement("SkullList");
					listSkulls(true, previousSkulls).forEach(skull => {
						previousSkulls.add(skull);
						var skullElement = document.createElement("Skull");
						skullElement.id = "_skull_" + skull;
						skullList.appendChild(skullElement);
					})
					missionElement.appendChild(skullList);
					break;
				case "fixedSkulls":
					var skullList = document.createElement("SkullList");
					listSkulls().forEach(skull => {
						var skullElement = document.createElement("Skull");
						skullElement.id = "_skull_" + skull;
						skullList.appendChild(skullElement);
					})
					missionElement.appendChild(skullList);
					break;
			}
			skullList ? console.log(skullList.childElementCount + " skulls for mission " + _MISSION.replaceAll("_map_id_", "")) : null;
			maplist.appendChild(missionElement);
		}

		playlist.appendChild(maplist);

		playlist.setAttribute("id", playlistIDBase + "-" + generationCount + "-" + i);
		playlist.setAttribute("name", playlistTitle + " " + generationCount + "-" + i);
		playlist.setAttribute("desc", playlistDescriptionArray.join(", "));

		crosstitle.appendChild(playlist);
	}

	missionplaylistdb.documentElement.appendChild(crosstitle);
	var missionplaylistdbText = prepareXML(missionplaylistdb);

	generatedfile = new File([missionplaylistdbText], "missionplaylistdb.xml", {type: "text/xml",});
	document.querySelector("#download").href = URL.createObjectURL(generatedfile);
	document.querySelector("#download").removeAttribute("hidden");
}

function generateMombasaRogue() {

	generationCount++;

	const playlistTitle = "Like a Rogue in Mombasa";
	const missionCount = parseInt(document.querySelector("input#missionCount").value);
	const playlistCount = parseInt(document.querySelector("#playlistCount").value);
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

	var playlistDescriptionArray = [];
	h1 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo1"]) : null;
	h2 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo3"]) : null;
	h3 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo3"]) : null;
	odst ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo3odst"]) : null;
	reach ? playlistDescriptionArray.push(HUMANIZER_OBJECT["haloreach"]) : null;
	h4 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["halo4"]) : null;
	includeCutscenes ? playlistDescriptionArray.push(HUMANIZER_OBJECT["cutscenes"]) : null;
	playlistDescriptionArray.push(allowDupes ? HUMANIZER_OBJECT["allowDupes"] : HUMANIZER_OBJECT["noDupes"]);
	playlistDescriptionArray.push(HUMANIZER_OBJECT[skullMode]);
	console.log(playlistDescriptionArray);

	console.log("Beginning Like a Rogue in Mombasa");

	var maplist = maplistBase.cloneNode();
	var playlist = playlistBase.cloneNode();

	const lmOut = listMissions("rogue");
	var chosenMissions = lmOut[0];
	const bossMissions = lmOut[1];

	for (let i = missionCount; i <= chosenMissions.length; i += missionCount + 1) {
		chosenMissions.splice(i, 0, "BOSS");
	}
	for (let i = 0; i <= chosenMissions.length; i += 2) {
		chosenMissions.splice(i, 0, "halo3odst_mombasa_streets_" + Math.floor(Math.random()*7));
	}

	console.log("Missions for roguelike playlist shuffled");
	console.log(chosenMissions);
	var previousSkulls = new Set();
	for (i = 0; i <= chosenMissions.length - 1; i++) {
		var missionElement = document.createElement("Map");
		if (i != 0 && chosenMissions[i].startsWith("halo3odst_mombasa_streets")) {
			missionElement.setAttribute("id", "_map_id_halo3odst_mombasa_streets");
			missionElement.setAttribute("insertionpoint", chosenMissions[i].at(-1));
			var availableSkulls = shuffleList(Array.from(listSkulls(false, new Set(previousSkulls))));
			previousSkulls.add(availableSkulls[0]);
		} else {
			missionElement.setAttribute("id", "_map_id_" + chosenMissions[i]);
		}
		var skullList = document.createElement("SkullList");
		previousSkulls.forEach(skull => {
			var skullElement = document.createElement("Skull");
			skullElement.id = "_skull_" + skull;
			skullList.appendChild(skullElement);
		})
		missionElement.appendChild(skullList);
		missionElement.setAttribute("diffID", globalDifficulty)
		if (chosenMissions[i].endsWith("BOSS")) {
			missionElement.setAttribute("id", bossMissions.pop());
			switch (missionElement.getAttribute("id")) {
				case "halo3_the_ark":
					missionElement.setAttribute("insertionpoint", 1);
					break;
				case "halo3_the_covenatn":
					missionElement.setAttribute("insertionpoint", 1);
					break;
				case "halo3odst_coastal_highway":
					missionElement.setAttribute("insertionpoint", 1);
					break;
				case "halo4_infinity":
					missionElement.setAttribute("insertionpoint", 2);
					break;
			}
			let previousSkullsArray = Array.from(previousSkulls);
			let skullsToRemove = [];
			switch (globalDifficulty) {
				case "_campaign_difficulty_level_easy":
					missionElement.setAttribute("diffID", "_campaign_difficulty_level_normal");
					skullsToRemove.push(previousSkullsArray[Math.floor(Math.random() * (previousSkullsArray.length + 1))]);
					break;
				case "_campaign_difficulty_level_normal":
					missionElement.setAttribute("diffID", "_campaign_difficulty_level_hard");
					skullsToRemove.push(previousSkullsArray[Math.floor(Math.random() * (previousSkullsArray.length + 1))]);
					skullsToRemove.push(previousSkullsArray[Math.floor(Math.random() * (previousSkullsArray.length + 1))]);
					break;
				case "_campaign_difficulty_level_hard":
					missionElement.setAttribute("diffID", "_campaign_difficulty_level_impossible");
					skullsToRemove.push(previousSkullsArray[Math.floor(Math.random() * (previousSkullsArray.length + 1))]);
					skullsToRemove.push(previousSkullsArray[Math.floor(Math.random() * (previousSkullsArray.length + 1))]);
					skullsToRemove.push(previousSkullsArray[Math.floor(Math.random() * (previousSkullsArray.length + 1))]);
					break;
			}
			skullsToRemove.forEach(s => previousSkulls.delete(s));
		}
		maplist.appendChild(missionElement);
	}

	playlist.appendChild(maplist);

	playlist.setAttribute("id", playlistIDBase + "-" + generationCount);
	playlist.setAttribute("name", playlistTitle + " " + generationCount);
	playlist.setAttribute("desc", playlistDescriptionArray.join(", "));

	crosstitle.appendChild(playlist);

	missionplaylistdb.documentElement.appendChild(crosstitle);
	var missionplaylistdbText = prepareXML(missionplaylistdb);

	generatedfile = new File([missionplaylistdbText], "missionplaylistdb.xml", {type: "text/xml",});
	document.querySelector("#download").href = URL.createObjectURL(generatedfile);
	document.querySelector("#download").removeAttribute("hidden");
}
