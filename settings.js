function saveSetting(element) {
	const input = element.target;
	var currentSettings = new URLSearchParams(window.location.search)
	switch (input.type) {
		case "checkbox":
			currentSettings.set(input.id, input.checked);
			console.log("saved " + input.id + " as " + input.checked);
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
		defaultSettings.set("excludeCutscenes", true);
		defaultSettings.set("allowDupes", false);
		defaultSettings.set("difficulty", "legendary");
		defaultSettings.set("skulls", false);
		defaultSettings.set("boots_off_the_ground", true);
		defaultSettings.set("bandanna", true);
		defaultSettings.set("scarab", true);
		defaultSettings.set("iron", false);
		defaultSettings.set("foreign", false);
		defaultSettings.set("jacked", false);
		defaultSettings.set("grunt_funeral", true);
		defaultSettings.set("so_angry", true);
		defaultSettings.set("blind", false);
		defaultSettings.set("Halo1", true);
		defaultSettings.set("Halo2", true);
		defaultSettings.set("Halo3", true);
		defaultSettings.set("Halo3ODST", true);
		defaultSettings.set("HaloReach", true);
		defaultSettings.set("Halo4", true);
		window.history.replaceState("null", "", "?" + defaultSettings);
		fetchCareerDB();
	};
	var currentSettings = new URLSearchParams(window.location.search)
	const legacySettings = {
		"acrophobia": "boots_off_the_ground",
		"funeral": "grunt_funeral",
		"angy": "so_angry"
	};
	for (const oldSetting in legacySettings) {
		if (currentSettings.has(oldSetting)) {
			currentSettings.set(legacySettings[oldSetting], currentSettings.get(oldSetting));
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
