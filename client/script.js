// Deklarera en variabel för URL till lokala servern.
const localUrl = "http://localhost:3000/cars";

// Lägg till en event listener som laddar data när sidan laddas.
window.addEventListener('load', fetchData);

// Skapa HTML för en container som ska innehålla bil-listan.
let listContainerHTML = '<div id="listContainer"></div>';
const main = document.querySelector("main");
main.insertAdjacentHTML("beforeend", listContainerHTML);

// Hämta elementet för listcontainern och göm den initialt.
const listContainerElement = document.getElementById('listContainer');
listContainerElement.setAttribute('hidden', 'hidden');

// Initiera Bootstrap modal-dialoger för att skapa och visa sammanfattning.
const myModal = new bootstrap.Modal(document.getElementById('createModal'));
const summaryModalEl = document.getElementById('summaryModal');
const summaryModalLabel = document.getElementById('summaryModalLabel');
const summaryModal = new bootstrap.Modal(summaryModalEl);

// När sammanfattningsmodalen visas, sätt fokus på dess etikett.
summaryModalEl.addEventListener('shown.bs.modal', function() {
  summaryModalLabel.focus();
});

// Funktion för att hämta och visa data om bilar.
function fetchData() {
  // Använd fetch-API:t för att hämta data från servern.
  fetch(localUrl)
    .then(result => result.json())  
    .then((cars) => {
      // Skapa HTML för att visa bilarna om det finns några.
      if (cars.length >= 0) {
        let html = '<div class="container"><div class="row justify-content-center">'; 
        cars.forEach(car => {
          // Kod för att bestämma textfärg beroende på bilens färg.
           const colorsRequiringWhiteText = ['Black', 'Green', 'Brown', 'Grey'];
           const textColorStyle = colorsRequiringWhiteText.includes(car.color) ? 'color: white;' : '';
          
           const carColorLower = car.color.toLowerCase();
          // Bygg upp HTML för varje bil.
          html += `<div class="card shadow col-12 col-md-4 col-lg-3 col-xxl-2 m-1 text-center p-0">
                    <div class="card-header">
                      <h3 class="card-title m-0">${car.regNum}</h3>
                    </div>
                    <div class="card-body">
                      <p class="card-text">Manufacturer: ${car.manufact}</p>        
                      <p class="card-text">Model: ${car.model}</p>
                      <p class="card-text">Year Manufactured: ${car.manufactYear}</p>
                      <p class="card-text">Fuel: ${car.fuel}</p>
                      <p class="card-text">Color: <span class="d-inline-block border h-auto w-50 animated-background-box--${carColorLower}"; style="${textColorStyle}">${car.color}</span></p>
                    </div>
                    <div class="card-footer text-body-secondary">
                      <button type="button" class="btn text-black animated-background-button--orange btn-tilt--forwards" onClick="setCurrentCar(${car.id})"><span>Update</span></button>
                      <button type="button" class="btn text-black animated-background-button--red btn-tilt--backwards" onClick="deleteCar(${car.id})"><span>Delete</span></button>
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
// Funktion för att sätta nuvarande bil som ska redigeras.
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
// Funktion för att radera en bil.
function deleteCar(id) {
  fetch(`${localUrl}/${id}`, { method: 'DELETE' })
    .then((result) => {
      const modalBodyMessage = document.getElementById('modalMessage');
      modalBodyMessage.innerHTML = `<p>Car with ID: ${id} has been deleted</p>`;

      myModal.show();

      fetchData();
    });
}
// Lägg till event listener för att visa/dölja bil-listan.
const btnReadCars = document.getElementById("btnReadCars");

btnReadCars.addEventListener("click", () => {
    if (listContainer.hasAttribute("hidden")) {
        listContainer.removeAttribute("hidden");
    } else {
        listContainer.setAttribute("hidden", "hidden");
    }
});

// Funktion för att uppdatera detaljer i modalen baserat på användarens inmatning.
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
// Lägg till event listeners för att automatiskt uppdatera modalens detaljer.
document.getElementById('regNum').addEventListener('input', modalDetails);
document.getElementById('model').addEventListener('input', modalDetails);
document.getElementById('manufact').addEventListener('input', modalDetails);
document.getElementById('manufactYear').addEventListener('input', modalDetails);
document.getElementById('color').addEventListener('input', modalDetails);
document.getElementById('fuel').addEventListener('input', modalDetails);
// Hantera formulärinskickning.
carForm.addEventListener("submit", handleSubmit);

// Stäng modalen när användaren klickar på stäng-knapparna
document.getElementById('closeModal').addEventListener('click', () => {
  summaryModal.hide();
});
document.getElementById('closeCrossModal').addEventListener('click', () => {
  summaryModal.hide();
});
// Hantera inskickning av formuläret och uppdatera/lägg till bil i databasen.
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
      const modalBodyMessage = document.getElementById('modalMessage');

      if (serverCarObject.id) {
        modalBodyMessage.innerHTML = `<p>Car with ID: ${serverCarObject.id} has been updated.</p>`;
      } else {
        modalBodyMessage.innerHTML = `<p>New car has been added.</p>`;
      }
      myModal.show();
      fetchData();
    })
    .catch(error => {
      console.error('There was an error:', error);
    });

  localStorage.removeItem('currentId');
  carForm.reset();
}
// Visa det nuvarande året i footer.
const footerYear = document.getElementById("footerYear");
const date = new Date();
const year = date.getFullYear();
footerYear.innerHTML = `© ${year} - Car Registry`;

// Funktion för att visa hjälptext när användaren fokuserar på ett fält.
function toggleHelpText(input) {
  var helpTextId = input.getAttribute('aria-describedby');
  var helpText = document.getElementById(helpTextId);

  input.addEventListener('focus', function() {
    helpText.removeAttribute('hidden');
  });

  input.addEventListener('blur', function() {
    helpText.setAttribute('hidden', 'hidden');
  });
}
// Tillämpa toggleHelpText på alla fält som behöver det.
document.querySelectorAll('.input-field').forEach(toggleHelpText);

// Tillåt bara siffror i vissa fält.
document.querySelectorAll('.digits-only').forEach(function(input) {
  input.addEventListener('input', function() {
    this.value = this.value.replace(/[^\d]/g, '');
  });
});