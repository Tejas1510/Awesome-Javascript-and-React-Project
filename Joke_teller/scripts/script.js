window.addEventListener("load", init);

// GLOBAL Constatnts for DOM Manipulation
const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");

// to associate events with functions on load
function init() {
  button.addEventListener("click", getJoke);
  audioElement.addEventListener("ended", toggleButton);
}

// ENABLE/DISABLE Buttons
function toggleButton() {
  button.disabled = !button.disabled;
}

// Pass Joke to TextToVoiceRSS API
function tellMeJoke(joke) {
  VoiceRSS.speech({
    key: "b453a00cea6247e99a6e36467628505a",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// fetch joke from Joke API
async function getJoke() {
  let joke = "";
  const apiURL =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // TextToVoice RSS
    tellMeJoke(joke);
    // call to toggle Button
    toggleButton();
  } catch (error) {
    console.error("Something went wrong! ", error);
  }
}
