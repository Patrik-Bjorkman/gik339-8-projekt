const localUrl = "http://localhost:3000/cars";

window.addEventListener('load', fetchData);

function fetchData() {
  fetch(localUrl)
    .then(result => result.json())  
    .then((cars) => {
      if (cars.length > 0) {
        let html = '<div class="container"><div class="row justify-content-center">'; 
        cars.forEach(car => {
          
          html += `<div class="card shadow col-12 col-md-4 col-lg-3 col-xxl-2 m-1 text-center p-0">
                    <div class="card-header">
                      <h3 class="card-title m-0">${car.regNum}</h3>
                    </div>
                    <div class="card-body">
                      <p class="card-text">Manufacturer: ${car.manufact}</p>        
                      <p class="card-text">Model: ${car.model}</p>
                      <p class="card-text">Year Manufactured: ${car.manufactYear}</p>
                      <p class="card-text">Fuel: ${car.fuel}</p>
                      <p class="card-text">ID: ${car.id}</p>
                      <p class="card-text">Color: <span class="d-inline-block border" style="background-color: ${car.color}; width: 30px; height: 20px;"></span> ${car.color}</p>
                    </div>
                    <div class="card-footer text-body-secondary">
                      <button type="button" class="btn text-black animated-background-button--orange" onClick="setCurrentCar(${car.id})"><span>Update</span></button>
                      <button type="button" class="btn text-black animated-background-button--red" onClick="deleteCar(${car.id})"><span>Delete</span></button>
                    </div>
                  </div>`;
        });
        html += '</div></div>';
        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
      }
    });
}

function setCurrentCar(id) {
  console.log('current',id);

  fetch(`${localUrl}/${id}`)
    .then((result) => result.json())
    .then((car) => {
      console.log(car);
      carForm.regNum.value = car.regNum;
      carForm.model.value = car.model;
      carForm.manufact.value = car.manufact;
      carForm.manufactYear.value = car.manufactYear;
      carForm.color.value = car.color;
      carForm.fuel.value = car.fuel;

      localStorage.setItem('currentId', car.id);
    });
}
function deleteCar(id) {
  fetch(`${localUrl}/${id}`, { method: 'DELETE' })
    .then((result) => {
      const myModal = new bootstrap.Modal(document.getElementById('createModal'));
      const modalBodyMessage = document.getElementById('modalMessage');
      modalBodyMessage.innerHTML = `<p>Car with ID: ${id} has been deleted</p>`;

      myModal.show();

      fetchData();
    });
}

const btnReadCars = document.getElementById("btnReadCars");

btnReadCars.addEventListener("click", () => {
    if (listContainer.hasAttribute("hidden")) {
        listContainer.removeAttribute("hidden");
    } else {
        listContainer.setAttribute("hidden", "hidden");
    }
});


function modalDetails() {
  const regNum = document.getElementById('regNum').value;
  const model = document.getElementById('model').value;
  const manufact = document.getElementById('manufact').value;
  const manufactYear = document.getElementById('manufactYear').value;
  const color = document.getElementById('color').value;
  const fuel = document.getElementById('fuel').value;

  document.getElementById('revRegNum').textContent = regNum;
  document.getElementById('revModel').textContent = model;
  document.getElementById('revManufact').textContent = manufact;
  document.getElementById('revManufactYear').textContent = manufactYear;
  document.getElementById('revColor').textContent = color;
  document.getElementById('revFuel').textContent = fuel;
}
document.getElementById('regNum').addEventListener('input', modalDetails);
document.getElementById('model').addEventListener('input', modalDetails);
document.getElementById('manufact').addEventListener('input', modalDetails);
document.getElementById('manufactYear').addEventListener('input', modalDetails);
document.getElementById('color').addEventListener('input', modalDetails);
document.getElementById('fuel').addEventListener('input', modalDetails);

carForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverCarObject = {
    regNum: "",
    model: "",
    manufact: "",
    manufactYear: "",
    color: "",
    fuel: ""
  };
  serverCarObject.regNum = carForm.regNum.value;
  serverCarObject.model = carForm.model.value;
  serverCarObject.manufact = carForm.manufact.value;
  serverCarObject.manufactYear = carForm.manufactYear.value;
  serverCarObject.color = carForm.color.value;
  serverCarObject.fuel = carForm.fuel.value;

  const id = localStorage.getItem('currentId');
  if (id) {
    serverCarObject.id = id;
  }

  const request = new Request(localUrl, {
    method: serverCarObject.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(serverCarObject)
  });

  fetch(request)
    .then(() => {
      // Code to show the modal with different messages
      const myModal = new bootstrap.Modal(document.getElementById('createModal'));
      const modalBodyMessage = document.getElementById('modalMessage');

      if (serverCarObject.id) {
        // Message for update operation
        modalBodyMessage.innerHTML = `<p>Car with ID: ${serverCarObject.id} has been updated.</p>`;
      } else {
        // Message for create operation
        modalBodyMessage.innerHTML = `<p>New car has been added.</p>`;
      }

      myModal.show();

      fetchData();
    });

  localStorage.removeItem('currentId');
  carForm.reset();
}

const footerYear = document.getElementById("footerYear");
const date = new Date();
const year = date.getFullYear();

footerYear.innerHTML = `© ${year} - Car Registry`;
