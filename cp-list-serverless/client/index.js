const listElement = document.querySelector('.list');
const filterInput = document.querySelector('#filter');
filterInput.addEventListener('keyup', filterlist);
let names;
let elementbyId = {};
async function getData() {
    const url = `https://cplist.vercel.app/api/cplist`;
    const rawData = await fetch(url);
    const data = await rawData.json();
    names = data;
    const arr = data.objects;
    arr.forEach(element => {
        createList(element);
    });

}


function secToHrs(sec) {
    sec = Number(sec);
    var h = Math.floor(sec / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

function createList(element) {
    const {
        href: link,
        event,
        duration,
        start,
        id
    } = element;
    const name = element.resource.name;
    const list_div = document.createElement('div');
    list_div.dataset.id = id;
    elementbyId[id] = list_div;
    const ul = document.createElement('ul');
    ul.className = 'list-group mt-3';
    const a = document.createElement('a');
    a.className = 'list-group-item list-group-item-action active text-center';
    a.href = link;
    a.textContent = event;
    a.target = '_blank';
    ul.appendChild(a);
    const ul2 = document.createElement('ul');
    ul2.className = 'list-group list-group-horizontal text-center';
    const li1 = document.createElement('li');
    li1.className = 'list-group-item list-group-item-action';
    li1.textContent = start;
    const li2 = document.createElement('li');
    li2.className = 'list-group-item list-group-item-action';
    li2.textContent = secToHrs(duration);
    const a1 = document.createElement('a');
    a1.className = 'list-group-item list-group-item-action';
    a1.textContent = name;
    a1.href = `https://${name}`;
    a1.target = '_blank';
    ul2.appendChild(li1);
    ul2.appendChild(li2);
    ul2.appendChild(a1);
    ul.appendChild(ul2);
    list_div.appendChild(ul);
    listElement.appendChild(list_div);
}

function filterlist(event) {
    const filter = event.target.value;
    const regExp = new RegExp(filter, 'gi');
    const nameArr = names.objects;
    if (nameArr) {
        nameArr.forEach(name => {
            if (name.event.match(regExp)) {
                // document.querySelector(`div[data-id="${name.id}"]`).style.display = '';
                elementbyId[name.id].style.display = '';
            } else {
                // document.querySelector(`div[data-id="${name.id}"]`).style.display = 'none';
                elementbyId[name.id].style.display = 'none';
            }
        });
    }
}
getData();