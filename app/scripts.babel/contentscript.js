'use strict';

var getelementbyclass = function (node) {
  if (node.className == ('name ')) //filter out elements with this class attribute
    return NodeFilter.FILTER_ACCEPT
  else
    return NodeFilter.FILTER_SKIP
}

function textNodesUnder(element) {
  var node = void 0;
  var textNodes = [];

  var walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, getelementbyclass, false);

  while (node = walker.nextNode()) {
    textNodes.push(node);
  }

  return textNodes;
}

var textNodes = textNodesUnder(document.body);

textNodes.forEach(function (node) {
  var imageNode = document.createElement('img');
  imageNode.src = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Curation_bar_icon_info_16x16.png';
  imageNode.alt = 'More  info';
  return node.appendChild(imageNode);
});