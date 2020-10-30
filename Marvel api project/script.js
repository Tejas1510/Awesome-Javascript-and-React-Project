const div = document.getElementById("poster")

const key ="feeb60c154ef25cea582b041281f8828"
const hash = "c5a95c638e95318764e70214061d8c0e"
// 1009368
window.addEventListener("load", getcomics(1009368))
function getcomics(id){
    div.innerHTML=""
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=${key}&hash=${hash}`)
    .then(response => response.json())
    .then(data => {
        const results= data.data.results

        results.forEach(result => {
           if(result.images[0]!=null){
            document.getElementById("alert").innerHTML = ""
            const source = result.images[0].path + ".jpg"
            const parentpanel = document.createElement("div")
            parentpanel.classList+="parentpanel"
            const panel = document.createElement("div");

            const paneltitle =document.createElement("a");
            paneltitle.textContent = result.title;
           paneltitle.href = result.urls[0].url;
           console.log(paneltitle)
            panel.classList+= "panel"
            panel.style.backgroundImage =`url(${source})`

            panel.appendChild(paneltitle)
            parentpanel.appendChild(panel)
            div.appendChild(parentpanel)
           }
           else{
               document.getElementById("alert").innerHTML = "no comics of this character available"
           }
        });
    }
    )


    .catch(err=> {
        console.error(err.message)
    })
}

const charList = [
    "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua-and-Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  ];

const charElement = document.querySelector("input");
const suggestionsElement = document.getElementById("suggestions");

function createSuggestionElement(character,id ) {
  const element = document.createElement("div");
  element.classList.add("suggestion");
  element.textContent = character;
//   Handle click on a suggestion

  element.addEventListener("click", e => {
    charElement.value = e.target.textContent;
    getcomics(id)
    // Empty the suggestion list
    suggestionsElement.innerHTML = "";
  });
  return element;
};

charElement.addEventListener("input", () => {
  // Empty suggestion list
  suggestionsElement.innerHTML = "";
  if(charElement.value=="")
  return;

  fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${charElement.value}&ts=1&apikey=${key}&hash=${hash}`)
    .then(response => response.json())
    .then(data => {
        const results= data.data.results
         results.forEach(character => {
         suggestionsElement.appendChild(createSuggestionElement(character.name,character.id));
    
         });
    });
})
