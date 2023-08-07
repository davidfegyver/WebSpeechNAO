const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const colors = {
  "piros": "red",
  "zöld": "green",
  "kék": "blue",
  "sárga": "yellow",
  "fekete": "black",
  "fehér": "white",
  "narancs": "orange",
  "lila": "purple",
  "rózsaszín": "pink",
  "barna": "brown",
  "szürke": "grey",
  "dávid": "#0583D2",
  "sári": "#FFCF56"
}

const recognition = new SpeechRecognition();

recognition.lang = 'hu-HU';

const diagnostic = document.getElementById('diagnostic');
const bg = document.querySelector('html');

document.body.onclick = function () {
  recognition.start();
  diagnostic.textContent = 'A felismerés elindult.';
}

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript

  diagnostic.textContent = 'Felismert szöveg: ' + transcript


  const hunColor = Object.keys(colors).find(color => transcript.toLowerCase().includes(color))

  if (!hunColor) {
    diagnostic.innerHTML += "<br> Nem ismertem fel színt. :(";
    return;
  }

  const HTMLColor = colors[hunColor];

  bg.style.backgroundColor = HTMLColor;

  diagnostic.innerHTML += "<br> Felismert szín: " + hunColor;
  diagnostic.innerHTML += "<br> HTML szín: " + HTMLColor;
}


recognition.onspeechend = function () {
  recognition.stop();
}

recognition.onnomatch = function (event) {
  diagnostic.textContent = "Nem ismertünk fel szöveget.";
}

recognition.onerror = function (event) {
  diagnostic.textContent = 'Hiba történt a felismerésben ' + event.error;
}
