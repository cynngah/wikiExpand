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
                  var link = srcElement.getAttribute('href');
                  // check if it's got an href and if it comes from wikipedia
                  if (link && (link.match('.*wikipedia.*', 'i'))) {
                      // call mouseover crap
                      addExpansionButton(srcElement);
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
function addExpansionButton(element) {
    console.log('BUTTON MADE');
    // make button
    var expandButton = document.createElement('button');
    expandButton.className = 'expandButton';
    // put button after link
    element.insertAdjacentElement('afterend', expandButton);
    expandButton.addEventListener('click', expandElement, false);
}

/**
* Modify the page
*/
function expandElement(element) {
    console.log('HELLO WORLD');
    // add the description/abstract part of wikipedia page in a little blurb
}
