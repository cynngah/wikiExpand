// TODO: FIX DIS PYRAMID
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
      var AList = document.getElementsByTagName('A');
      AList.forEach(srcElement => {
            // check if element is an anchor tag.
            if (srcElement.nodeName == 'A') {
                var link = srcElement.getAttribute('href');
                // check if it's got an href and if it comes from wikipedia
                if (link && (srcElement.getAttribute('href').match('.*wikipedia.org.*', 'i'))) {
                    // call mouseover crap
                    addExpansion(srcElement);
                }
            }
      });

  }
})

/**
* Add expansion button beside wiki tags
*
* @param element dom element to be modified/add javascript/css behavior to
*/
function addExpansionButton(element) {
    // make button
    var expandButton = document.createElement('button');
    expandButton.id = 'expandButton';
    // put button after link
    element.parentElement.insertAdjacentElement('afterEnd', expandButton);
    // add listener
    element.addEventListener('click', expandElement, false);
}

/**
* Modify the page
*/
function expandElement(element) {
    console.log('HELLO WORLD');
    // add the description/abstract part of wikipedia page in a little blurb
}
