const localUrl = "http://localhost:3000/cars";

window.addEventListener('load', fetchData);

function fetchData() {
  fetch(localUrl)
    .then(result => result.json())  
    .then((cars) => {
      if (cars.length > 0) {
        let html = '<div class="row">'; 
        cars.forEach(car => {
          
          html += `<div class="col-auto mb-3">
                    <div class="container mt-3 border border-black shadow rounded p-3">
                      <h3 class="h1 fw-bold">${car.regNum}</h3>
                      <p>Manufacturer: ${car.manufact}</p>        
                      <p>Model: ${car.model}</p>
                      <p>Year Manufactured: ${car.manufactYear}</p>
                      <p>Fuel: ${car.fuel}</p>
                      <p>ID: ${car.id}</p>
                      <p>Color: <span class="d-inline-block" style="background-color: ${car.color}; width: 30px; height: 20px; border: 1px solid #000;"></span> ${car.color}</p>
                      <div class="mt-3">
                        <button type="button" class="btn btn-gradient btn-gradient--blue" onClick="setCurrentCar(${car.id})"><span>Update</span></button>
                        <button type="button" class="btn btn-gradient btn-gradient--red" onClick="deleteCar(${car.id})"><span>Delete</span></button>
                      </div>
                    </div>
                  </div>`;
        });
        html += '</div>';
        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
      }
    });
}


// function fetchData() {
//   fetch(localUrl)
//     .then(result => result.json())  
//     .then((cars) => {
//       if (cars.length > 0) {
//         let html = `<ul>`;
//         cars.forEach(car => {
//           html += `<li class="container border border-black flex row rounded mt-3 p-3"><h3 class="h1 fw-bold">${car.regNum}</h3>
//                   <p class="d-block">Manufacturer: ${car.manufact}</p>        
//                   <p class="d-block">Model: ${car.model}</p>
//                   <p class="d-block">Year Manufactured: ${car.manufactYear}</p>
//                   <p class="d-block">Fuel: ${car.fuel}</p>
//                   <p class="d-block">ID: ${car.id}</p>
//                   <p class="col-auto">Color: ${car.color}</p>
//                   <div class=" liDiv__styling border border-black rounded col-2" style="background-color: ${car.color}"></div>
//                   <div class="container m-4">
//                   <button type="button" class="btn btn-primary col-auto" onClick="setCurrentCar(${car.id})">Update</button>
//                   <button type="button" class="btn btn-danger col-auto" onClick="deleteCar(${car.id})">Delete</button>
//                   </div>
//                   </li>`;
//         });
//         html += `</ul>`;
//         const listContainer = document.getElementById("listContainer");
//         listContainer.innerHTML = "";
//         listContainer.insertAdjacentHTML("beforeend", html);
//       }
//     });
// }

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
  // Dynamically create the modal HTML
  let modalHTML = `
    <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-black" id="deleteConfirmationModalLabel">Confirm Deletion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-black">The Car with ID: ${id}, has been deleted!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;
  // Insert the modal into the DOM
  const body = document.body;
  body.insertAdjacentHTML('beforeend', modalHTML);

  // Show the modal using Bootstrap's JavaScript
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
  deleteModal.show();

  // Add event listener for the confirm deletion button
  document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
    fetch(`${localUrl}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
      // On successful deletion, re-fetch the data and close the modal
      fetchData();
      deleteModal.hide();
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
      // Clean up by removing the modal from the DOM
      document.getElementById('deleteConfirmationModal').remove();
    });
  }, { once: true }); // Use the 'once' option so the event will only trigger once
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
    fetchData();

    localStorage.removeItem('currentId');
    carForm.reset();
}
