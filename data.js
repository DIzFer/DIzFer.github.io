const MISSIONS = {
	"halo1": [
		{id: "pillar_of_autumn"},
		{id: "halo"},
		{id: "truth_and_reconciliation"},
		{id: "silent_cartographer"},
		{id: "assault_on_the_control_room"},
		{id: "343_guilty_spark"},
		{id: "the_library"},
		{id: "two_betrayals"},
		{id: "keyes"},
		{id: "the_maw"}
	],
	"halo2": [
		{id: "cairo_station"},
		{id: "outskirts"},
		{id: "metropolis"},
		{id: "the_arbiter"},
		{id: "the_oracle"},
		{id: "delta_halo"},
		{id: "regret"},
		{id: "sacred_icon"},
		{id: "quarantine_zone"},
		{id: "gravemind"},
		{id: "uprising"},
		{id: "high_charity"},
		{id: "the_great_journey"}
	],
	"halo3": [
		{id: "sierra_117"},
		{id: "crows_nest"},
		{id: "tsavo_highway"},
		{id: "the_storm"},
		{id: "floodgate"},
		{id: "the_ark"},
		{id: "the_covenant"},
		{id: "cortana"},
		{id: "halo"}
	],
	"halo3odst": [
		{id: "mombasa_streets", insertionpoint: 0},
		{id: "tayari_plaza"},
		{id: "mombasa_streets", insertionpoint: 1},
		{id: "uplift_reserve"},
		{id: "mombasa_streets", insertionpoint: 2},
		{id: "kizingo_boulevard"},
		{id: "mombasa_streets", insertionpoint: 3},
		{id: "oni_alpha_site"},
		{id: "mombasa_streets", insertionpoint: 4},
		{id: "nmpd_hq"},
		{id: "mombasa_streets", insertionpoint: 5},
		{id: "kikowani_station"},
		{id: "mombasa_streets", insertionpoint: 6},
		{id: "data_hive"},
		{id: "coastal_highway"}
	],
	"haloreach": [
		{id: "winter_contingency"},
		{id: "oni_sword_base"},
		{id: "nightfall"},
		{id: "tip_of_the_spear"},
		{id: "long_night_of_solace"},
		{id: "exodus"},
		{id: "new_alexandria"},
		{id: "the_package"},
		{id: "the_pillar_of_autumn"}
	],
	"halo4": [
		{id: "dawn"},
		{id: "requiem"},
		{id: "forerunner"},
		{id: "infinity"},
		{id: "reclaimer"},
		{id: "shutdown"},
		{id: "composer"},
		{id: "midnight"}
	]
};

const BOSS_MISSIONS = {
	"halo1": [
		{id: "assault_on_the_control_room"},
		{id: "the_library"},
		{id: "two_betrayals"}
	],
	"halo2": [
		{id: "the_oracle"},
		{id: "delta_halo"},
		{id: "regret"},
		{id: "high_charity"},
		{id: "the_great_journey"}
	],
	"halo3": [
		{id: "the_ark", insertionpoint: 1},
		{id: "the_covenant", insertionpoint: 1},
		{id: "halo"}
	],
	"halo3odst": [
		{id: "nmpd_hq"},
		{id: "data_hive"},
		{id: "coastal_highway", insertionpoint: 1}
	],
	"haloreach": [
		{id: "tip_of_the_spear"},
		{id: "long_night_of_solace"},
		{id: "the_pillar_of_autumn"}
	],
	"halo4": [
		{id: "infinity", insertionpoint: 2},
		{id: "composer"},
		{id: "midnight"}
	]
};

const CUTSCENES = {
	"halo2": [
		{id: "the_heretic"},
		{id: "the_armory"}
	],
	"halo3": [
		{id: "arrival"},
		{id: "epilogue"}
	],
	"halo3odst": [
		{id: "prepare_to_drop"},
		{id: "epilogue"}
	],
	"haloreach": [
		{id: "noble_actual"},
		{id: "the_pillar_of_autumn_credits"},
		{id: "lone_wolf"}
	],
	"halo4": [
		{id: "prologue"},
		{id: "epilogue"}
	]
};

const SKULLS = {
	"OP_SKULLS": [
		"bandanna",
		"boots_off_the_ground",
		"scarab"
	],
	"FRUSTRATING_SKULLS": [
		"blind",
		"famine",
		"recession",
	],
	"DANGEROUS_SKULLS": [
		"foreign",
		"grunt_funeral",
		"iron",
		"jacked",
		"so_angry",
	],
	"FUN_SKULLS": [
		"grunt_birthday_party",
		"iwhbyd",
		"prophet_birthday_party",
	],
	"MISC_SKULLS": [
		"anger",
		"black_eye",
		"boom",
		"catch",
		"eye_patch",
		"fog",
		"ghost",
		"malfunction",
		"mythic",
		"pinata",
		"sputnik",
		"thats_just_wrong",
		"thunderstorm",
		"tough_luck",
		"assassins",
		"bonded_pair",
		"envy",
		"feather",
		"masterblaster",
		"streaking",
		"swarm",
		"they_come_back",
		"cowbell",
		"tilt"
	]
};

const FFS_XML_FIX_LIST = {
	"crosstitle": "CrossTitle",
	"playlist": "Playlist",
	"maplist": "MapList",
	"<map": "<Map",
	"</map>": "</Map>",
	"diffid=": "diffID=",
	"<halo": "<Halo",
	"</halo": "</Halo",
	"<Haloreach": "<HaloReach",
	"</Haloreach": "</HaloReach",
	"<Halo3odst": "<Halo3ODST",
	"</Halo3odst": "</Halo3ODST",
	"skulllist": "SkullList",
	"<skull": "<Skull",
	"</skull": "</Skull",
};

const HUMANIZER_OBJECT = {
	"_campaign_difficulty_level_easy": "Easy",
	"_campaign_difficulty_level_normal": "Normal",
	"_campaign_difficulty_level_hard": "Heroic",
	"_campaign_difficulty_level_impossible": "Legendary",
	"halo1": "CE",
	"halo2": "H2",
	"halo3": "H3",
	"halo3odst": "ODST",
	"haloreach": "Reach",
	"halo4": "H4",
	"cutscenes": "Cutscenes",
	"allowDupes": "Dupes allowed",
	"noDupes": "No Dupes",
	"noSkulls": "No skulls",
	"randomSkulls": "Random skulls",
	"incrementalSkulls": "Incremental skulls",
	"fixedSkulls": "Fixed skulls",
	"rogue": "Roguelike mode"
}
