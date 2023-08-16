const GAMES = {
	"halo1": [
		"pillar_of_autumn",
		"halo",
		"truth_and_reconciliation",
		"silent_cartographer",
		"assault_on_the_control_room",
		"343_guilty_spark",
		"the_library",
		"two_betrayals",
		"keyes",
		"the_maw"
	],
	"halo2": [
		"cairo_station",
		"outskirts",
		"metropolis",
		"the_arbiter",
		"the_oracle",
		"delta_halo",
		"regret",
		"sacred_icon",
		"quarantine_zone",
		"gravemind",
		"uprising",
		"high_charity",
		"the_great_journey"
	],
	"halo3": [
		"sierra_117",
		"crows_nest",
		"tsavo_highway",
		"the_storm",
		"floodgate",
		"the_ark",
		"the_covenant",
		"cortana",
		"halo"
	],
	"halo3odst": [
		"mombasa_streets_0",
		"tayari_plaza",
		"mombasa_streets_1",
		"uplift_reserve",
		"mombasa_streets_2",
		"kizingo_boulevard",
		"mombasa_streets_3",
		"oni_alpha_site",
		"mombasa_streets_4",
		"nmpd_hq",
		"mombasa_streets_5",
		"kikowani_station",
		"mombasa_streets_6",
		"data_hive",
		"coastal_highway"
	],
	"haloreach": [
		"winter_contingency",
		"oni_sword_base",
		"nightfall",
		"tip_of_the_spear",
		"long_night_of_solace",
		"exodus",
		"new_alexandria",
		"the_package",
		"the_pillar_of_autumn"
	],
	"halo4": [
		"dawn",
		"requiem",
		"forerunner",
		"infinity",
		"reclaimer",
		"shutdown",
		"composer",
		"midnight"
	]
};

const BOSS_MISSIONS = {
	"halo1": [
		"assault_on_the_control_room",
		"the_library",
		"two_betrayals"
	],
	"halo2": [
		"the_oracle",
		"delta_halo",
		"regret",
		"high_charity",
		"the_great_journey"
	],
	"halo3": [
		"the_ark", // 1
		"the_covenant", // 1
		"halo" //
	],
	"halo3odst": [
		"nmpd_hq",
		"data_hive",
		"coastal_highway" // 1
	],
	"haloreach": [
		"tip_of_the_spear",
		"long_night_of_solace",
		"the_pillar_of_autumn"
	],
	"halo4": [
		"forerunner",
		"infinity", // 2
		"composer",
		"midnight"
	]
};

const CUTSCENES = {
	"halo2": [
		"the_heretic",
		"the_armory"
	],
	"halo3": [
		"arrival",
		"epilogue"
	],
	"halo3odst": [
		"prepare_to_drop",
		"epilogue"
	],
	"haloreach": [
		"noble_actual",
		"the_pillar_of_autumn_credits",
		"lone_wolf"
	],
	"halo4": [
		"prologue",
		"epilogue"
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
