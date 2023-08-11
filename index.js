var missionplaylistdb = document.implementation.createDocument(null, "MissionPlaylists");
missionplaylistdb.documentElement.setAttribute("version", "4");
crosstitle = document.createElement("CrossTitle");
const playlistBase = document.createElement("Playlist");
const maplistBase = document.createElement("MapList");
var generationCount = 0;

var careerdb = document.implementation.createDocument(null, "Empty");

parseCareerDB();
insertSkullControls();
readSettings();

for (const _GAME of GAMES) {
	missionplaylistdb.documentElement.appendChild(document.createElement(_GAME));
}

function generatePlaylists() {
	generationCount++;

	var missionList = listMissions();

	const playlistTitle = document.querySelector("input#playlistTitle").value;
	const missionCount = document.querySelector("input#missionCount").value;
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

	if (!includeCutscenes) {
		missionList = missionList.filter(mission => !CUTSCENES.includes(mission));
	}

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
		console.log("Beginning");

		var maplist = maplistBase.cloneNode();
		var playlist = playlistBase.cloneNode();

		var chosenMissions = shuffleMissionList(missionList).slice(0, missionCount);
		console.log("Missions for playlist " + i + " shuffled");
		console.log(chosenMissions);
		var previousSkulls = new Set();
		for (const _MISSION of chosenMissions) {
			var missionElement = document.createElement("Map");
			missionElement.setAttribute("id", _MISSION);
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
