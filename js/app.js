let employees = [];
const urlAPI =`https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalCLose = document.querySelector('.modal-close');
const rightArrow = document.querySelector('.arrow-right');
const leftArrow = document.querySelector('.arrow-left')

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData){
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
    employeeHTML += `
    <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
              <h2 class="name">${name.first} ${name.last}</h2>
              <p class="email">${email}</p>
              <p class="address">${city}</p>
            </div>
          </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}

gridContainer.addEventListener('click', e =>{
    if(e.target !== gridContainer){
        const card = e.target.closest('.card')
        const index = card.getAttribute('data-index');
        if(index < 1){
            leftArrow.classList.add('hidden')
        } else if(index > 10){
            rightArrow.classList.add('hidden')
        }
        displayModal(index);
    }
});

function displayModal(index){
    let { name, 
        dob, 
        phone, 
        email, 
        location: { city, street, state, postcode},
        picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
        <img class="avatar" src="${picture.large}">
        <div class="text-modal-container" data-index="${index}">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
}

rightArrow.addEventListener('click', () =>{
    const textContainer = document.querySelector('.text-modal-container');
    let index = parseInt(textContainer.getAttribute('data-index'));
    index += 1;
    leftArrow.classList.remove('hidden');
    if(index > 10){
        rightArrow.classList.add('hidden');
    }
    displayModal(index);
})

leftArrow.addEventListener('click', () =>{
    const textContainer = document.querySelector('.text-modal-container');
    let index = parseInt(textContainer.getAttribute('data-index'));
    index -= 1;
    rightArrow.classList.remove('hidden');
    if(index < 1){
        leftArrow.classList.add('hidden');
    }
    displayModal(index);
})

modalCLose.addEventListener('click', () => {
    overlay.classList.add('hidden');
    leftArrow.classList.remove('hidden');
    rightArrow.classList.remove('hidden');
});

function search() {   
    var input, filter, name;
    input = document.getElementById('search-input');
    filter = input.value.toUpperCase();
    name = document.getElementsByClassName('name');
    for (i = 0; i < name.length; i++) {
      if (name[i].textContent.toUpperCase().indexOf(filter) > -1) {
        name[i].parentNode.parentNode.style.display = "";
      } else {
        name[i].parentNode.parentNode.style.display = "none";
      }
    }
  }