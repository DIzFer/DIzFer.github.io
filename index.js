var missionplaylistdb = document.implementation.createDocument(null, "MissionPlaylists");
missionplaylistdb.documentElement.setAttribute("version", "4");
crosstitle = document.createElement("CrossTitle");
const playlistBase = document.createElement("Playlist");
const maplistBase = document.createElement("MapList");
var generationCount = 0;

var careerdb = document.implementation.createDocument(null, "Empty");

readSettings();

parseCareerDB();

for (const _GAME of GAMES) {
	missionplaylistdb.documentElement.appendChild(document.createElement(_GAME));
}

function generatePlaylists() {
	generationCount++;

	var missionList = listMissions();

	const playlistTitle = document.querySelector("input#playlistTitle").value;
	const missionCount = document.querySelector("input#missionCount").value;
	const playlistCount = document.querySelector("#playlistCount").value;
	const excludeCutscenes = document.querySelector("input#excludeCutscenes").checked;
	const allowDupes = document.querySelector("input#allowDupes").checked;
	const globalDifficulty = document.querySelector("input[name=difficulty]:checked").value;
	const skulls = document.querySelector("input#skulls").checked;
	const acrophobia = document.querySelector("input#acrophobia").checked;
	const bandanna = document.querySelector("input#bandanna").checked;
	const scarab = document.querySelector("input#scarab").checked;
	const iron = document.querySelector("input#iron").checked;
	const foreign = document.querySelector("input#foreign").checked;
	const jacked = document.querySelector("input#jacked").checked;
	const funeral = document.querySelector("input#funeral").checked;
	const angy = document.querySelector("input#angy").checked;
	const h1 = document.querySelector("input#Halo1").checked;
	const h2 = document.querySelector("input#Halo2").checked;
	const h3 = document.querySelector("input#Halo3").checked;
	const odst = document.querySelector("input#Halo3ODST").checked;
	const reach = document.querySelector("input#HaloReach").checked;
	const h4 = document.querySelector("input#Halo4").checked;

	if (excludeCutscenes) {
		missionList = missionList.filter(mission => !CUTSCENES.includes(mission));
	}

	const date = new Date();
	const playlistIDBase = date.toISOString();

	var playlistDescriptionArray = [];
	h1 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["Halo1"]) : null;
	h2 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["Halo3"]) : null;
	h3 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["Halo3"]) : null;
	odst ? playlistDescriptionArray.push(HUMANIZER_OBJECT["Halo3ODST"]) : null;
	reach ? playlistDescriptionArray.push(HUMANIZER_OBJECT["HaloReach"]) : null;
	h4 ? playlistDescriptionArray.push(HUMANIZER_OBJECT["Halo4"]) : null;
	excludeCutscenes ? null : playlistDescriptionArray.push(HUMANIZER_OBJECT["cutscenes"]);
	playlistDescriptionArray.push(allowDupes ? HUMANIZER_OBJECT["allowDupes"] : HUMANIZER_OBJECT["noDupes"]);
	if (skulls) {
		playlistDescriptionArray.push(HUMANIZER_OBJECT["skulls"]);
		acrophobia ? null : playlistDescriptionArray.push(HUMANIZER_OBJECT["noAcrophobia"]);
		bandanna ? null : playlistDescriptionArray.push(HUMANIZER_OBJECT["noBandanna"]);
		scarab ? null : playlistDescriptionArray.push(HUMANIZER_OBJECT["noScarab"]);
		iron ? null : playlistDescriptionArray.push(HUMANIZER_OBJECT["noIron"]);
		foreign ? null : playlistDescriptionArray.push(HUMANIZER_OBJECT["noForeign"]);
		jacked ? null : playlistDescriptionArray.push(HUMANIZER_OBJECT["noJacked"]);
		funeral ? null : playlistDescriptionArray.push(HUMANIZER_OBJECT["noFuneral"]);
		angy ? null : playlistDescriptionArray.push(HUMANIZER_OBJECT["noAngy"]);
	} else {
		playlistDescriptionArray.push(HUMANIZER_OBJECT["noSkulls"]);
	}
	console.log(playlistDescriptionArray);


	for (let i = 1; i <= playlistCount; i++) {
		console.log("maplistBase");
		console.log(maplistBase);
		console.log("playlistBase");
		console.log(playlistBase);

		var maplist = maplistBase.cloneNode();
		var playlist = playlistBase.cloneNode();

		var chosenMissions = shuffleMissionList(missionList).slice(0, missionCount);
		console.log("missions for playlist " + i);
		console.log(chosenMissions);
		for (const _MISSION of chosenMissions) {
			var missionElement = document.createElement("Map");
			missionElement.setAttribute("id", _MISSION);
			missionElement.setAttribute("diffID", globalDifficulty)
			if (skulls) {
				var skullList = document.createElement("SkullList");
				listSkulls().forEach(skull => {
					if (Math.random() < .2) {
						var skullElement = document.createElement("Skull");
						skullElement.id = skull;
						skullList.appendChild(skullElement);
					}
				})
				missionElement.appendChild(skullList);
			}
			maplist.appendChild(missionElement);
		}

		playlist.appendChild(maplist);

		playlist.setAttribute("id", playlistIDBase + "-" + generationCount + "-" + i);
		playlist.setAttribute("name", playlistTitle + " " + generationCount + "-" + i);
		playlist.setAttribute("desc", playlistDescriptionArray.join(", "));

		console.log(crosstitle);

		crosstitle.appendChild(playlist);
	}

	missionplaylistdb.documentElement.appendChild(crosstitle);
	var missionplaylistdbText = prepareXML(missionplaylistdb);

	generatedfile = new File([missionplaylistdbText], "missionplaylistdb.xml", {type: "text/xml",});
	document.querySelector("#download").href = URL.createObjectURL(generatedfile);
	document.querySelector("#download").removeAttribute("hidden");
}
