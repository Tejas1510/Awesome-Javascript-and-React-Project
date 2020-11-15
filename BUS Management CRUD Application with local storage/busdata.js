window.onload = function () {
  let initialbuses = [
   
  ];

  if (localStorage.getItem("currentbuses") == null) {
    localStorage.setItem("currentbuses", JSON.stringify(initialbuses));
  }
};

function display(busarray = undefined) {
  let tabledata = "";
  let allbuses;
  if (busarray == undefined) {
    allbuses = JSON.parse(localStorage.getItem("currentbuses"));
  } else {
    allbuses = busarray;
  }

  allbuses.forEach(function (bus, index) {
    let currentrow = `<tr>
      <td>${index + 1}</td>
      <td>${bus.name}</td>
      <td>${bus.source}</td>
      <td>${bus.destination}</td>
      <td>${bus.number}</td>
      <td>${bus.passcap}</td>
      <td>
      <button onclick='deleteBus(${index})'>delete</button>
      <button onclick='showModal(${index})'>update</button>
      </td>
      </tr>`;

    tabledata += currentrow;
  });

  document.getElementsByClassName("tdata")[0].innerHTML = tabledata;
 
}

display();

function addBus(e) {
  e.preventDefault();
  let newBus = {};
  let name = document.getElementById("name").value;
  let source = document.getElementById("source").value;
  let destination= document.getElementById("destination").value;
  let number = document.getElementById("number").value;
  let passenger_capacity = document.getElementById("passcap").value;
  newBus.name = name;
  newBus.number = Number(number);
  newBus.destination = destination;
  newBus.source = source;
  newBus.passcap=passenger_capacity;


  let allbuses = JSON.parse(localStorage.getItem("currentbuses"));
  allbuses.push(newBus);
  localStorage.setItem("currentbuses", JSON.stringify(allbuses));

  display();

  document.getElementById("name").value = "";
  document.getElementById("source").value = "";
  document.getElementById("destination").value = "";
  document.getElementById("number").value = "";
  document.getElementById("passcap").value = "";
}

function searchBySource() {
  let searchValue = document.getElementById("searchSource").value;
  let searchvalue = document.getElementById("searchDestination").value;
  let allbuses = JSON.parse(localStorage.getItem("currentbuses"));
  let newdata = allbuses.filter(function (bus) {
    return (
      bus.source.toUpperCase().indexOf(searchValue.toUpperCase()) != -1 && bus.destination.toUpperCase().indexOf(searchvalue.toUpperCase()) != -1 
    );
  });

  display(newdata);
}

function searchByDestination() {
  let searchValue = document.getElementById("searchDestination").value;
  let searchvalue = document.getElementById("searchSource").value;
  let allbuses = JSON.parse(localStorage.getItem("currentbuses"));
  let newdata = allbuses.filter(function (bus) {
    return (
      bus.destination.toUpperCase().indexOf(searchValue.toUpperCase()) != -1 && bus.source.toUpperCase().indexOf(searchvalue.toUpperCase()) != -1 
    );
  });

  display(newdata);
}



let updateIndex;

function copyBus(index) {
  let allbuses = JSON.parse(localStorage.getItem("currentbuses"));
  updateIndex = index;console.log(updateIndex);
  let currentBus = allbuses[index];

  document.getElementById("upname").value = currentBus.name;
  document.getElementById("upsrc").value = currentBus.source;
  document.getElementById("updest").value = currentBus.destination;
  document.getElementById("upnumber").value = currentBus.number;
  document.getElementById("uppasscap").value = currentBus.passcap;
  
}

function updateBus(e) {
  e.preventDefault();
  let allbuses = JSON.parse(localStorage.getItem("currentbuses"));
  let currentBus = allbuses[updateIndex];
  let name = document.getElementById("upname").value;
  let source = document.getElementById("upsrc").value;
  let destination= document.getElementById("updest").value;
  let number = document.getElementById("upnumber").value;
  let passenger_capacity = document.getElementById("uppasscap").value;
  currentBus.name = name;
  currentBus.number = Number(number);
  currentBus.destination = destination;
  currentBus.source = source;
  currentBus.passcap=passenger_capacity;

  localStorage.setItem("currentbuses", JSON.stringify(allbuses));
  display(allbuses);

  
  let modal = document.getElementsByClassName("modal")[0];
  modal.style.display = "none";
}

function deleteBus(index) {
  let allbuses = JSON.parse(localStorage.getItem("currentbuses"));
  allbuses.splice(index, 1);
  localStorage.setItem("currentbuses", JSON.stringify(allbuses));
  display();
}



function showModal(index) {
  let modal = document.getElementsByClassName("modal")[0];
  modal.style.display = "block";

  copyBus(index);
}

function hideModal(event) {
  if (event.target.className == "modal") {
    let modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "none";
  }
}