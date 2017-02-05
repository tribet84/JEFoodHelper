'use strict';

$(document).ready(function () {

  var myElement = $('.tooltip');

  myElement.tooltipster({
    theme: 'tooltipster-punk',
    functionPosition: function (instance, helper, position) {
      position.coord.left -= 137;
      return position;
    },
    content: 'Looking for description...',
    maxWidth: 400,
    side: 'top',
    interactive: true,
    functionReady: function (instance, helper) {
      addWikiDescription(instance);
    },
    animation: 'fall'
  });

  myElement.tooltipster({
    theme: 'tooltipster-punk',
    functionPosition: function (instance, helper, position) {
      position.coord.left -= 137;
      return position;
    },
    content: 'Looking for pictures...',
    animation: 'slide',
    updateAnimation: null,
    trackTooltip: true,
    multiple: true,
    side: 'bottom',
    interactive: true,
    functionReady: function (instance, helper) {
      var dish = instance._$origin['0'].innerText;
      var fotorama = $.parseHTML('<div class="fotorama" data-keyboard="true" data-autoplay="true" data-fit="cover" data-auto="false" data-width="250" data-height="250"></div>');
      instance.content(fotorama);
      addGoogleImages(dish);
    }
  });
});

function addWikiDescription(instance) {
  // get description from Wikipedia
  var dish = instance._$origin['0'].innerText;
  var url = 'https://en.wikipedia.org/w/api.php';
  $.getJSON(url, {
    search: dish,
    action: 'opensearch',
    suggest: true,
    format: 'json',
    limit: 2,
    utf8: true,
    ascii: true
  },
    function (wikiData) {
      // sometimes data is empty

      var text = wikiData[0];
      var clearedData = wikiData[2].filter(function (v) { return v !== '' });
      var wikiLink = '';
      if (clearedData.length != 0) {
        wikiLink = wikiData[3][0];
        text = clearedData[0];
      } else {
        wikiLink = 'https://en.wikipedia.org/wiki/Special:Search?search='+wikiData[0];
        text = 'No entry found in Wiki';
      }


      var html = `<div id="wrap">
<div class="box" style="width: 70%">
'<a href="` + wikiLink + '" target="_blank">' + text + `'</a>
</div>
<div class="box" style="width: 30%">
<img style="max-width: 120px;" src="http://gordonramsay.neocities.org/gordon.png"></img>
</div>
</div>`;
      instance.content($.parseHTML(html));
    });
}

function addGoogleImages(dish) {
  // get images from Google
  var url = 'https://www.googleapis.com/customsearch/v1';
  var images = [];
  $.getJSON(url, {
    q: dish,
    key: 'AIzaSyAM_qwB41HeKMkvnbPWXuSnJh6FK7KR1e4',
    cx: '011534142765689922040:lt8lkf6zbvs',
    searchType: 'image',
    imgSize: 'medium',
    alt: 'json'
  }, function (data) {
    data.items.forEach(function (item) {
      images.push({ img: item.link });
    });
    $('.fotorama').fotorama({
      data: images
    });
  });
}

$('div.information > h4').addClass('tooltip');
$('.orderDetail').siblings().addClass('tooltip');
