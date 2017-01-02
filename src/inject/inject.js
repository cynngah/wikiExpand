var link;
var el;
var currentEl;
// keep track of each expanded button and un-expand it after

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

        var AList = [].slice.call(document.getElementsByTagName('A'));
        AList.forEach(srcElement => {
              // check if element is an anchor tag.
              if (srcElement.nodeName == 'A') {
                  link = srcElement.getAttribute('href');
                  // check if it's got an href and if it comes from wikipedia
                  if (link && (link.match('.*wikipedia*', 'i'))) {
                      el = srcElement;
                      // call mouseover crap
                      addExpansionButton(srcElement, link);
                  }
              }
        });
	}
	}, 10);
});

/**
* Add expansion button beside wiki tags
*
* @param element dom element to be modified/add javascript/css behavior to
*/
function addExpansionButton(element, lnk) {
    // make button
    var expandButton = document.createElement('button');
    expandButton.className = 'expandButton';
    console.log(expandButton);
    expandButton.setAttribute('id', lnk);
    // put button after link
    expandButton.addEventListener('click', requestExpand, false);
    element.insertAdjacentElement('afterend', expandButton);
}

function requestExpand(element) {
    if (element.srcElement.className !== "expandButton expanded") {
        xhrRequest(element);
    } else {
        removeElement(element);
    }
    // STEPS!
    // 1. form query
    // 2. make request to wikipedia
    // 3. get information in json
    // 4. get abstract
    // 5. make webview
    // 6. put abstract into webview
    // 7. append webview afterend to object
}

function removeElement(e) {
    var pid = 'p' + e.srcElement.id;
    var removed = document.getElementById(pid);
    console.log('HELLO', removed);
    removed.parentElement.removeChild(removed);
}

function xhrRequest(e) {
    var xhr = new XMLHttpRequest();
    currentEl = e;
    var urlLink = e.srcElement.id;
    e.srcElement.className += " expanded";
    var name = urlLink.substring(urlLink.lastIndexOf('/') + 1);

    var wikiReq = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=';
    wikiReq += name.replace('_', '%20').replace('(', '%28').replace(')', '%29');
    xhr.open('GET', wikiReq, true);
    xhr.responseType = 'json';
    xhr.addEventListener('load', expandData);

    xhr.send();
}

function expandData(e) {
    var content = e.currentTarget.response.query.pages;
    var index = first(content);
    var blurb = content[index].extract;
    var paragraph = document.createElement('p');
    paragraph.innerHTML = blurb;
    console.log(e);
    paragraph.setAttribute('id', 'p' + currentEl.srcElement.id);
    el.insertAdjacentElement('afterend', paragraph);
}

function first(obj) {
    for (var a in obj) {
        return a;
    }
}
