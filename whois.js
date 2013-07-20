
window.addEventListener("click", function(){console.log("here");}, false);

chrome.contextMenus.create({
    "title": "Whois Lookup",
    "contexts": ["selection"],
    "onclick": whoisLookup
}, function(){
	console.log('Created context menu')
});

function whoisLookup(selection) {
	var ipRE = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
		domainRE = /(^(https?):\/\/|^)(([^\.]+)\.([^\.]+\.[^\/$]+)|([^\.]+\.[^\/$]+))\/?$/,
		text = selection.selectionText,
		url;

	if (ipRE.exec(text)) {
		url = "http://whois.domaintools.com/" + text + "#wrTab-record";
		chrome.windows.create({
			"type": "popup",
			"url": url,
			"width": 656,
			"height": 600
		});
	}
	else if (domainRE.exec(text)) {
		url = "http://whois.webhosting.info/" + text;
		chrome.windows.create({
			"type": "popup",
			"url": url,
			"width": 656,
			"height": 600
		});
	}
	else {
		console.log("Invalid selection.");
	}

}