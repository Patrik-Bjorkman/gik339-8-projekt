const localUrl = "http://localhost:3000/cars";
const responsePromise = fetch(localUrl);

responsePromise
  .then(response => {
    return response.json();
  })
const request = new Request(localUrl);
fetch(localUrl)
  .then(response => response.json())
  .then((cars) => {
    const listContainer = document.getElementById("listContainer");
    // listContainer.classList.add("container");
    const ul = document.createElement('ul');
    // ul.classList.add("row","mt-5");
    listContainer.appendChild(ul);
    cars.forEach(car => {
      const liDiv = document.createElement('div');
      const li = document.createElement('li');
      li.innerHTML = `<h3 class="h1 fw-bold">${car.regNum}</h3>
                      <p class="col-auto">Modell: ${car.model}</p>
                      <p class="col-auto">Tillverkare: ${car.manufact}</p>
                      <p class="col-auto">Tillverkningsår: ${car.manufactYear}</p>
                      <p class="col-auto">Drivmedel: ${car.fuel}</p>
                      <p class="col-auto">ID: ${car.id}</p>
                      <p class="col-auto">Färg: ${car.color}</p>`;
      liDiv.style.backgroundColor = car.color;
      liDiv.classList.add("liDiv__styling","border","border-black", "rounded", "col-2");
      li.classList.add("container","border","border-black","flex","row","rounded","mt-3","p-3");
      ul.appendChild(li)
      li.appendChild(liDiv);
    });
    return cars;
  })
  .then((data) => console.log(data));

  const btnReadCars = document.getElementById("btnReadCars");

// btnReadCars.addEventListener("click", () => {
//     if (listContainer.hasAttribute("hidden")) {
//         listContainer.removeAttribute("hidden");
//     } else {
//         listContainer.setAttribute("hidden", "hidden");
//     }
// });


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
