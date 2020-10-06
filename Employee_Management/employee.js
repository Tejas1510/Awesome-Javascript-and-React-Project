let ouremployees = [
  {
    name: "Shwet",
    age: 19,
    city: "Vadodara",
    salary: "Rs.2,00,000",
  },
  {
    name: "Raj",
    age: 25,
    city: "Ahmadabad",
    salary: "Rs.1,50,000",
  },
  {
    name: "Hetav",
    age: 20,
    city: "Surat",
    salary: "Rs.1,75,000",
  },
  {
    name: "Poojan",
    age: 22,
    city: "Surat",
    salary: "Rs.2,50,000",
  },
  {
    name: "Tejasvini",
    age: 26,
    city: "Jaipur",
    salary: "Rs.1,25,000",
  },
];

function display(employeearray) {
  let tabledata = "";

   employeearray.forEach(function (employee, index) {
    let currentrow = `<tr>
    <td>${index + 1}</td>
    <td>${employee.name}</td>
    <td>${employee.age}</td>
    <td>${employee.city}</td>
    <td>${employee.salary}</td>
    <td>
    <button onclick='deleteEmployee(${index})'>delete</button>
    </td>
    </tr>`;

    tabledata += currentrow;
  });

  document.getElementsByClassName("tdata")[0].innerHTML = tabledata;
  
}

display(ouremployees);


function searchByName() {
  let searchValue = document.getElementById("searchName").value;

  let newdata = ouremployees.filter(function (employee) {
    return (
      employee.name.toUpperCase().indexOf(searchValue.toUpperCase()) != -1
    );
  });

  display(newdata);
}

function searchByCity() {
  let searchValue = document.getElementById("searchCity").value;

  let newdata = ouremployees.filter(function (employee) {
    return (
      employee.city.toUpperCase().indexOf(searchValue.toUpperCase()) != -1
    );
  });

  display(newdata);
}



function deleteEmployee(index) {
  ouremployees.splice(index, 1);
  display(ouremployees);
}



