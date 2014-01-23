/*
 *= require_tree ./plugins
 *= require_self
 */

function preloadImages() {
  var images = ['angebot_change_und_projektmanagement.png', 'angebot_coaching_und_training.png', 'angebot_unternehmensentwicklung.png', 'home_unternehmensentwicklung.png', 'home_coaching_und_training.png', 'home_change_und_projektmanagement.png'];
  for (var image in images) {
    $('<img />').attr('src', '/images/' + images[image]);
  }
}

function attachImageSwap(id, image, reset) {
  $('#' + id).mouseenter(function () {
    $('#homeMap').attr('src', '/images/' + image);
  }).mouseleave(function () {
    $('#homeMap').attr('src', '/images/' + reset);
  });
}

function attachTextEffect(id, top, left, words) {
  window[id + 'Pos'] = 0;

  $('#' + id).mouseenter(function() {
    showTextEffect(id, words, top, left);
    window['intervalID'] = setInterval(function() { showTextEffect(id, words, top, left) }, 1000);
  }).mouseleave(function() {
    clearInterval(window['intervalID']);
    $('#text').remove();
  });
}

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

function showTextEffect(id, words, top, left) {
  $('#text').hide('puff', 500).remove();
  $("<div id='text' style='color: white; display: none; position: absolute; top: " + top + "px; left: " + left + "px;' >" + words[window[id + 'Pos']] + '</div>').appendTo($('div.competence')).fadeIn(500);
  window[id + 'Pos'] = window[id + 'Pos'] == words.length - 1 ? 0 : window[id + 'Pos'] += 1;
}

$(document).ready(function () {
  preloadImages();

  if (isCanvasSupported()) {
    if ($('.kenburns').length > 0) {
      $('img', '#img').kenburns();
      $('img', '#img').kenburns('set', {
        'zoom': 1.2,
        'duration': 5000,
        'height': 180,
        'width': 520,
        'align': 'random'
      });
    }
  }


  var touch = 'ontouchend' in document;

  if (!touch) {
    attachImageSwap('angebotchangeundprojektmanagement', 'angebot_change_und_projektmanagement.png', 'angebot.png');
    attachImageSwap('angebotcoachingundtraining', 'angebot_coaching_und_training.png', 'angebot.png');
    attachImageSwap('angebotunternehmensentwicklung', 'angebot_unternehmensentwicklung.png', 'angebot.png');

    attachImageSwap('homechangeundprojektmanagement', 'home_change_und_projektmanagement.png', 'home.png');
    attachImageSwap('homecoachingundtraining', 'home_coaching_und_training.png', 'home.png');
    attachImageSwap('homeunternehmensentwicklung', 'home_unternehmensentwicklung.png', 'home.png');

    $('#homechangeundprojektmanagement').mTip({ alignTo: 'cursor', spacing: 13 });
    $('#homecoachingundtraining').mTip({ alignTo: 'cursor', spacing: 13 });
    $('#homeunternehmensentwicklung').mTip({ alignTo: 'cursor', spacing: 13 });

    attachTextEffect('unternehmen', 110, 158, ['Wirtschaftlichkeit', 'Markt', 'Rechtsform', 'Produkte', 'Strategie', 'Dienstleistungen', 'Branche', 'Hierarchie', 'Standorte', 'Philosophie', 'Struktur', 'Kultur', 'Zielkunde']);
    attachTextEffect('mensch', 215, 415, ['Unternehmer', 'Werte', 'Führungskraft', 'Kulturkreise', 'Mitarbeiter', 'Erfahrungen', 'Kompetenzen', 'Projektleiter', 'Einstellungen', 'Erwartungen', 'Experte', 'Netzwerke']);
    attachTextEffect('methodik', 320, 158, ['Instrumente', 'Verständlichkeit', 'Massgeschneidert', 'Hilfsmittel', 'Funktional', 'Wirksamkeit', 'Investition', 'Vorgehensweisen', 'Skalierbarkeit', 'Kompatibilität', 'Aufwand']);
  }
});
