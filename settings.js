function saveSetting(element) {
	const input = element.target;
	var currentSettings = new URLSearchParams(window.location.search)
	switch (input.type) {
		case "checkbox":
			if (input.checked) {
				currentSettings.set(input.id, input.checked);
				console.log("saved " + input.id + " as " + input.checked);
			} else {
				currentSettings.delete(input.id);
			}
			break;
		case "radio":
			currentSettings.set(input.name, input.id);
			console.log("saved " + input.name + " as " + input.id);
			break;
		default:
			currentSettings.set(input.id, input.value);
			console.log("saved " + input.id + " as " + input.value);
	}
	window.history.replaceState("null", "", "?" + currentSettings);
}

function readSettings() {
	if (window.location.search === "") {
		console.log("restoring default settings");
		var defaultSettings = new URLSearchParams;
		defaultSettings.set("playlistTitle", "Randomized playlist");
		defaultSettings.set("missionCount", 7);
		defaultSettings.set("playlistCount", 3);
		defaultSettings.set("difficulty", "legendary");
		defaultSettings.set("skullMode", "noSkulls");
		defaultSettings.set("bandanna", true);
		defaultSettings.set("boots_off_the_ground", true);
		defaultSettings.set("scarab", true);
		defaultSettings.set("grunt_funeral", true);
		defaultSettings.set("so_angry", true);
		defaultSettings.set("grunt_birthday_party", true);
		defaultSettings.set("iwhbyd", true);
		defaultSettings.set("prophet_birthday_party", true);
		defaultSettings.set("boom", true);
		defaultSettings.set("malfunction", true);
		defaultSettings.set("pinata", true);
		defaultSettings.set("sputnik", true);
		defaultSettings.set("assassins", true);
		defaultSettings.set("bonded_pair", true);
		defaultSettings.set("envy", true);
		defaultSettings.set("feather", true);
		defaultSettings.set("masterblaster", true);
		defaultSettings.set("streaking", true);
		defaultSettings.set("cowbell", true);
		defaultSettings.set("halo1", true);
		defaultSettings.set("halo2", true);
		defaultSettings.set("halo3", true);
		defaultSettings.set("halo3odst", true);
		defaultSettings.set("haloreach", true);
		defaultSettings.set("halo4", true);
		window.history.replaceState("null", "", "?" + defaultSettings);
		fetchCareerDB();
	};
	var currentSettings = new URLSearchParams(window.location.search)
	const legacySettings = {
		"acrophobia": "boots_off_the_ground",
		"funeral": "grunt_funeral",
		"angy": "so_angry",
		"skulls": [ "skullMode", "randomSkulls" ],
		"Halo1": "halo1",
		"Halo2": "halo2",
		"Halo3": "halo3",
		"Halo3ODST": "halo3odst",
		"HaloReach": "haloreach",
		"Halo4": "halo4",
		"excludeCutscenes": "includeCutscenes"
	};
	for (const oldSetting in legacySettings) {
		if (currentSettings.has(oldSetting)) {
			if (oldSetting !== "excludeCutscenes") {
				currentSettings.set(legacySettings[oldSetting], currentSettings.get(oldSetting));
			}
			currentSettings.delete(oldSetting);
			window.history.replaceState("null", "", "?" + currentSettings);
		}
	}
	document.querySelectorAll("input").forEach(function(setting) {
		switch (setting.type) {
			case "checkbox":
				if (currentSettings.get(setting.id) === "true") {
					setting.setAttribute("checked", "checked");
				} else {
					setting.removeAttribute("checked");
				}
				//console.log("read " + setting.id + " as " + setting.checked);
				break;
			case "radio":
				if (currentSettings.get(setting.name) == setting.id) {
					setting.setAttribute("checked", "checked");
				} else {
					setting.removeAttribute("checked");
				}
				//console.log("read " + setting.name + " as " + setting.id);
				break;
			default:
				setting.value = currentSettings.get(setting.id);
				//console.log("read " + setting.id + " as " + setting.value);
		}
		setting.addEventListener("change", saveSetting);
	})
}
