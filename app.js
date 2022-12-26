const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const campoBusqueda = document.getElementById("campo-busqueda");
const botonBusqueda = document.getElementById("boton-busqueda");
const imagenPokemon = document.getElementById("imagen-pokemon");
const nombrePokemon = document.getElementById("nombre-pokemon");
const tipoPokemon = document.getElementById("tipo-pokemon");
const alturaPokemon = document.getElementById("altura-pokemon");
const pesoPokemon = document.getElementById("peso-pokemon");

botonBusqueda.addEventListener("click", buscarPokemon);

const botonVoz = document.getElementById("boton-voz");

botonVoz.addEventListener("click", iniciarReconocimientoDeVoz);

function iniciarReconocimientoDeVoz() {
  const reconocimientoDeVoz = new webkitSpeechRecognition();
  reconocimientoDeVoz.lang = "es-ES";
  reconocimientoDeVoz.interimResults = false;
  reconocimientoDeVoz.maxAlternatives = 1;

  reconocimientoDeVoz.start();

  reconocimientoDeVoz.addEventListener("result", (evento) => {
    const resultado = evento.results[0][0].transcript.toLowerCase();
    campoBusqueda.value = resultado;
    buscarPokemon();
  });
}

function buscarPokemon() {
  const nombreODex = campoBusqueda.value;

  fetch(API_URL + nombreODex)
    .then((response) => response.json())
    .then((datosPokemon) => mostrarPokemon(datosPokemon))
    .catch((error) => console.error(error));
}

function mostrarPokemon(datosPokemon) {
  imagenPokemon.style.backgroundImage = `url(${datosPokemon.sprites.front_default})`;
  nombrePokemon.textContent = datosPokemon.name;
  tipoPokemon.textContent = datosPokemon.types[0].type.name;
  alturaPokemon.textContent = `${datosPokemon.height / 10} m`;
  pesoPokemon.textContent = `${datosPokemon.weight / 10} kg`;
}

function buscarPokemon() {
  const nombreODex = campoBusqueda.value;

  fetch(API_URL + nombreODex)
    .then((response) => response.json())
    .then((datosPokemon) => mostrarPokemon(datosPokemon))
    .catch((error) => console.error(error));
}

function mostrarPokemon(datosPokemon) {
  imagenPokemon.style.backgroundImage = `url(${datosPokemon.sprites.front_default})`;
  nombrePokemon.textContent = datosPokemon.name;
  tipoPokemon.textContent = datosPokemon.types[0].type.name;
  alturaPokemon.textContent = `${datosPokemon.height / 10} m`;
  pesoPokemon.textContent = `${datosPokemon.weight / 10} kg`;
}

// audio
const audioElement = document.getElementById("pokemon-theme");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const timeline = document.getElementById("timeline");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const songList = [
  "gigamax.mp3",
  "red.mp3",
  "blue.mp3",
  "diamante.mp3",
  "batalla.mp3",
];
let currentSongIndex = 0;

function changeSong(index) {
  audioElement.src = songList[index];
  audioElement.currentTime = 0;
  currentSongIndex = index;
}

timeline.addEventListener("input", function () {
  audioElement.currentTime = (timeline.value / 100) * audioElement.duration;
});

playButton.addEventListener("click", function () {
  audioElement.play();
  currentSongIndex++;
  if (currentSongIndex >= songList.length) {
    currentSongIndex = 0;
  }
  changeSong(currentSongIndex);
});

pauseButton.addEventListener("click", function () {
  audioElement.pause();
});

nextButton.addEventListener("click", function () {
  currentSongIndex++;
  if (currentSongIndex >= songList.length) {
    currentSongIndex = 0;
  }
  changeSong(currentSongIndex);
});

prevButton.addEventListener("click", function () {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songList.length - 1;
  }
  changeSong(currentSongIndex);
});
