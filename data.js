const GAMES = [
	"halo1",
	"halo2",
	"halo3",
	"halo3odst",
	"haloreach",
	"halo4"
];

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

const CUTSCENES = [
	"_map_id_halo2_the_heretic",
	"_map_id_halo2_the_armory",
	"_map_id_halo3_arrival",
	"_map_id_halo3_epilogue",
	"_map_id_halo3odst_prepare_to_drop",
	"_map_id_halo3odst_epilogue",
	"_map_id_haloreach_noble_actual",
	"_map_id_haloreach_the_pillar_of_autumn_credits",
	"_map_id_haloreach_lone_wolf",
	"_map_id_halo4_prologue",
	"_map_id_halo4_epilogue",
];

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
	"fixedSkulls": "Fixed skulls"
}
