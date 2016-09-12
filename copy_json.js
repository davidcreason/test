{
	"id" : "iq_selective_copy_2",
	"icon_url" : "https://solutions.tealium.net/hosted/tealiumTools/export_tealium_tools/export_tealium_tools.png",
	"description" : "This Tealium Tool  allows you to select individual items from each tab in IQ, copy just those (vs. Copy Profile) and then Paste that in a new profile",
	"title" : "Copy/Paste Test",
	"scripts" : {
		"copy_tt" : {
			"title" : "Copy/Paste Test",
			"remote_template" : true,
			"template" : "https://raw.githubusercontent.com/davidcreason/test/master/tealium_iq_selective_copy2.html",
			"remote_js" : true,
			"js" : "https://rawgit.com/davidcreason/test/master/tealium_iq_selective_copy2.js",
			"auto_inject" : true
		}
	}
}
